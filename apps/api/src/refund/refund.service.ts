import {
	BadRequestException,
	Injectable
} from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { isValidTransactionStatusTransition } from 'src/transaction/helper/transaction-status-transition';
import { CreditCardService } from '../credit-card/credit-card.service';
import { LedgerService } from '../ledger/ledger.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionService } from '../transaction/transaction.service';
import { AuditService } from 'src/audit/audit.service';

@Injectable()
export class RefundService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly transactionService: TransactionService,
		private readonly creditCardService: CreditCardService,
		private readonly ledgerService: LedgerService,
		private readonly auditService: AuditService,
	) { }

	async refundTransaction(
		transactionId: string,
		customerId: string,
		idempotencyKey: string,
	) {

		const transaction = await this.transactionService.getTransactionByIdOrThrow(
			transactionId,
		);


		if (transaction.customerId !== customerId) {
			throw new BadRequestException('Transaction does not belong to customer');
		}

		const existingRefund =
			await this.transactionService.findByCustomerAndIdempotencyKey(
				customerId,
				idempotencyKey,
			);

		if (existingRefund) {
			return existingRefund;
		}


		if (
			!isValidTransactionStatusTransition(
				transaction.status,
				TransactionStatus.REFUNDED,
			)
		) {
			throw new BadRequestException(
				`Invalid status transition from ${transaction.status} to REFUNDED`,
			);
		}

		const card = await this.creditCardService.getCardByIdOrThrow(
			transaction.cardId,
		);

		this.creditCardService.assertCardBelongsToCustomer(card, customerId);

		const refundAmount = Number(transaction.amount);
		const restoredAvailableLimit = Number(card.availableLimit) + refundAmount;

		const { updatedTransaction, updatedCard } = await this.prisma.$transaction(
			async (tx) => {
				const updatedTransaction = await this.transactionService.updateTransactionStatusWithTx(
					tx,
					transaction.id,
					TransactionStatus.REFUNDED,
				);

				await this.ledgerService.createRefundIssuedLedgerEvent(tx, {
					transactionId: transaction.id,
					customerId,
					cardId: card.id,
					amount: refundAmount,
					currency: transaction.currency,
				});

				const updatedCard = await this.creditCardService.updateAvailableLimit(
					tx,
					card.id,
					restoredAvailableLimit,
				);

				await this.auditService.createAuditLog(tx, {
					actorCustomerId: customerId,
					action: 'REFUND_CREATED',
					targetType: 'transaction',
					targetId: transaction.id,
					metadata: {
						refundAmountCents: Math.round(Number(transaction.amount) * 100),
						currency: transaction.currency,
					},
				});

				return { updatedTransaction, updatedCard };
			},
		);

		return {
			transactionId: updatedTransaction.id,
			customerId: updatedTransaction.customerId,
			cardId: updatedTransaction.cardId,
			amountCents: Math.round(Number(updatedTransaction.amount) * 100),
			currency: updatedTransaction.currency,
			status: updatedTransaction.status,
			availableLimitCents: Math.round(Number(updatedCard.availableLimit) * 100),
			createdAt: updatedTransaction.createdAt,
		};;
	}
}