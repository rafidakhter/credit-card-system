import { Injectable } from '@nestjs/common';
import { OutboxEvent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export const MAX_EVENT_RETRY_COUNT = 3

@Injectable()
export class OutboxService {
	constructor(private readonly prisma: PrismaService) { }

	async findEventsReadyToProcess(limit = 10): Promise<OutboxEvent[]> {
		const now = new Date();

		return this.prisma.outboxEvent.findMany({
			where: {
				OR: [
					{
						status: 'PENDING',
					},
					{
						status: 'FAILED',
						nextRetryAt: {
							lte: now,
						},
						retryCount: {
							lt: MAX_EVENT_RETRY_COUNT,
						},
					},
				],
			},
			orderBy: {
				createdAt: 'asc',
			},
			take: limit,
		});
	}

	async markProcessed(eventId: string): Promise<void> {
		await this.prisma.outboxEvent.update({
			where: {
				id: eventId,
			},
			data: {
				status: 'PROCESSED',
				processedAt: new Date(),
			},
		});
	}

	async markFailed(eventId: string, error: unknown): Promise<void> {
		const message = error instanceof Error ? error.message : 'Unknown error';

		await this.prisma.outboxEvent.update({
			where: { id: eventId },
			data: {
				status: 'FAILED',
				failedAt: new Date(),
				errorMessage: message.slice(0, 500),
				retryCount: {
					increment: 1,
				},
				nextRetryAt: new Date(Date.now() + 60_000),
			},
		});

	}

	async markDeadLetter(eventId: string, error: unknown): Promise<void> {
		const message = error instanceof Error ? error.message : 'Unknown error';

		await this.prisma.outboxEvent.update({
			where: { id: eventId },
			data: {
				status: 'DEAD_LETTER',
				failedAt: new Date(),
				errorMessage: message.slice(0, 500),
				nextRetryAt: null,
			},
		});
	}

	async recordProcessingFailure(event: OutboxEvent, error: unknown): Promise<void> {
		const message = error instanceof Error ? error.message : 'Unknown error';
		const nextRetryCount = event.retryCount + 1;

		if (nextRetryCount >= MAX_EVENT_RETRY_COUNT) {
			await this.prisma.outboxEvent.update({
				where: { id: event.id },
				data: {
					status: 'DEAD_LETTER',
					failedAt: new Date(),
					errorMessage: message.slice(0, 500),
					retryCount: nextRetryCount,
					nextRetryAt: null,
				},
			});

			return;
		}

		await this.prisma.outboxEvent.update({
			where: { id: event.id },
			data: {
				status: 'FAILED',
				failedAt: new Date(),
				errorMessage: message.slice(0, 500),
				retryCount: nextRetryCount,
				nextRetryAt: new Date(Date.now() + 60_000),
			},
		});
	}
}