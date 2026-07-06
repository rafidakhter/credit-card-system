import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PurchaseCreatedEvent } from '../purchase/events/purchase-created.event';

@Injectable()
export class StatementService {
	constructor(private readonly prisma: PrismaService) {}

	async applyPurchaseCreated(event: PurchaseCreatedEvent): Promise<void> {
		const occurredAt = new Date(event.occurredAt);
		const year = occurredAt.getFullYear();
		const month = occurredAt.getMonth() + 1;

		await this.prisma.statementSummary.upsert({
			where: {
				customerId_year_month: {
					customerId: event.data.customerId,
					year,
					month,
				},
			},
			create: {
				customerId: event.data.customerId,
				year,
				month,
				totalAmountCents: event.data.amountCents,
				purchaseCount: 1,
			},
			update: {
				totalAmountCents: {
					increment: event.data.amountCents,
				},
				purchaseCount: {
					increment: 1,
				},
			},
		});
	}
}