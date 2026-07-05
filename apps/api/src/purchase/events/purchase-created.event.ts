export const PURCHASE_CREATED_EVENT = 'PurchaseCreated';

export type PurchaseCreatedEvent = {
	eventType: typeof PURCHASE_CREATED_EVENT;
	eventId: string;
	occurredAt: string;
	data: {
		purchaseId: string;
		transactionId: string;
		customerId: string;
		cardId: string;
		amount: number;
		currency: string;
	};
};