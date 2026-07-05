export type RefundResult = {
	transactionId: string
	customerId: string;
	cardId: string;
	amountCents: number;
	currency: string;
	status: 'APPROVED';
}