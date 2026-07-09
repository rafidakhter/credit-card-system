import { Injectable } from '@nestjs/common';
import { OutboxEvent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
}