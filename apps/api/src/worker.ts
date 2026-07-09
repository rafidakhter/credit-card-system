import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OutboxService } from './outbox/outbox.service';
import {
	PURCHASE_CREATED_EVENT,
	PurchaseCreatedEvent,
} from './purchase/events/purchase-created.event';
import { StatementService } from './statement/statement.service';

async function bootstrapWorker() {
	const app = await NestFactory.createApplicationContext(AppModule);

	console.log('Worker started');

	const outboxService = app.get(OutboxService);
	const statementService = app.get(StatementService);

	const eventsToProcess = await outboxService.findEventsReadyToProcess(10);

	for (const event of eventsToProcess) {
		console.log(`Processing event: ${event.id} ${event.eventType}`);

		try {
			if (event.eventType !== PURCHASE_CREATED_EVENT) {
				throw new Error(`Unknown event type: ${event.eventType}`);
			}

			await statementService.applyPurchaseCreated(
				event.payload as PurchaseCreatedEvent,
			);

			await outboxService.markProcessed(event.id);

			console.log(`Processed event: ${event.id}`);
		} catch (error) {
			await outboxService.recordProcessingFailure(event, error);

			console.error(`Failed event: ${event.id}`, error);
		}
	}

	await app.close();
}

bootstrapWorker();