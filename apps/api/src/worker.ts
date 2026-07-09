import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import {
	PURCHASE_CREATED_EVENT,
	PurchaseCreatedEvent,
} from './purchase/events/purchase-created.event';
import { StatementService } from './statement/statement.service';
import { OutboxService } from './outbox/outbox.service';

async function bootstrapWorker() {
	const app = await NestFactory.createApplicationContext(AppModule);

	console.log('Worker started');

	const outboxService = app.get(OutboxService);
	const statementService = app.get(StatementService);

	const eventsToProcess = await outboxService.findEventsReadyToProcess(10);

	for (const event of eventsToProcess) {
		console.log(`Processing event: ${event.id} ${event.eventType}`);

		try {
			if (event.eventType === PURCHASE_CREATED_EVENT) {
				await statementService.applyPurchaseCreated(
					event.payload as PurchaseCreatedEvent,
				);

				await outboxService.markProcessed(event.id);

				console.log(`Processed event: ${event.id}`);
			}
		} catch (error) {
			await outboxService.markFailed(event.id, error);

			console.error(`Failed event: ${event.id}`, error);
		}
	}

	await app.close();
}

bootstrapWorker();