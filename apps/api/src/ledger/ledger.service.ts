import { Injectable } from '@nestjs/common';
import { LedgerEvent, LedgerEventType, Prisma } from '@prisma/client';
import { CreatePurchaseApprovedLedgerEventInput } from './types/create-purchase-approved-ledger-event-input';

@Injectable()
export class LedgerService {
	async createPurchaseApprovedLedgerEvent(
		tx: Prisma.TransactionClient,
		input: CreatePurchaseApprovedLedgerEventInput,
	): Promise<LedgerEvent> {
		return tx.ledgerEvent.create({
			data: {
				transactionId: input.transactionId,
				customerId: input.customerId,
				cardId: input.cardId,
				eventType: LedgerEventType.PURCHASE_APPROVED,
				amount: input.amount,
				currency: input.currency,
				metadata: {
					merchantName: input.merchantName,
					merchantCategory: input.merchantCategory ?? null,
				},
			},
		});
	}
}