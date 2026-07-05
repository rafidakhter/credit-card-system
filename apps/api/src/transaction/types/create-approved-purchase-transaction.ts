export type CreateApprovedPurchaseTransactionInput = {
  customerId: string;
  cardId: string;
  merchantName: string;
  amount: number;
  currency: string;
  idempotencyKey: string;
};