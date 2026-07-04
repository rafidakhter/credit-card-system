export type PurchaseResult = {
  transactionId: string;
  customerId: string;
  cardId: string;
  amountCents: number;
  currency: string;
  merchantName: string;
  status: 'APPROVED';
  availableLimitCents: number;
  createdAt: Date;
};