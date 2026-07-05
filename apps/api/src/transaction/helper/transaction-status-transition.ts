import { TransactionStatus } from '@prisma/client';

const allowedTransitions: Record<TransactionStatus, TransactionStatus[]> = {
  PENDING: ['APPROVED'],
  APPROVED: ['SETTLED'],
  DECLINED: [],
  SETTLED: ['REFUNDED'],
  REFUNDED: [],
};

export function isValidTransactionStatusTransition(
  from: TransactionStatus,
  to: TransactionStatus,
): boolean {
  return allowedTransitions[from].includes(to);
}