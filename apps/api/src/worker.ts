import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import {
	PURCHASE_CREATED_EVENT,
	PurchaseCreatedEvent,
} from './purchase/events/purchase-created.event';
import { StatementService } from './statement/statement.service';

async function bootstrapWorker() {
	const app = await NestFactory.createApplicationContext(AppModule);

	console.log('Worker started');

	const prisma = app.get(PrismaService);
	const statementService = app.get(StatementService);

	const pendingEvents = await prisma.outboxEvent.findMany({
		where: {
			status: 'PENDING',
		},
		orderBy: {
			createdAt: 'asc',
		},
		take: 10,
	});

	console.log(`Found ${pendingEvents.length} pending outbox events`);

	for (const event of pendingEvents) {
		console.log(`Pending event: ${event.id} ${event.eventType}`);

		if (event.eventType === PURCHASE_CREATED_EVENT) {
			await statementService.applyPurchaseCreated(
				event.payload as PurchaseCreatedEvent,
			);

			await prisma.outboxEvent.update({
				where: { id: event.id },
				data: {
					status: 'PROCESSED',
					processedAt: new Date(),
				},
			});

			console.log(`Processed event: ${event.id}`);
		}
	}

	await app.close();
}

bootstrapWorker();