export type CreatePurchaseApprovedLedgerEventInput = {
  transactionId: string;
  customerId: string;
  cardId: string;
  amount: number;
  currency: string;
  merchantName: string;
  merchantCategory?: string;
};