import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTransactionsQueryDto } from './dto/get-transaction.dto';
import { isValidTransactionStatusTransition } from './helper/transaction-status-transition';
import { Prisma, Transaction, TransactionStatus } from '@prisma/client';
import { CreateApprovedPurchaseTransactionInput } from './types/create-approved-purchase-transaction';

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) { }


	async createApprovedPurchaseTransaction(
		tx: Prisma.TransactionClient,
		input: CreateApprovedPurchaseTransactionInput,
	): Promise<Transaction> {
		return tx.transaction.create({
			data: {
				customerId: input.customerId,
				cardId: input.cardId,
				merchantName: input.merchantName,
				amount: input.amount,
				currency: input.currency,
				status: TransactionStatus.APPROVED,
				idempotencyKey: input.idempotencyKey,
			},
		});
	}

	async updateTransactionStatus(
		transactionId: string,
		nextStatus: TransactionStatus,
	) {
		const transaction = await this.prisma.transaction.findUnique({
			where: { id: transactionId },
		});

		if (!transaction) {
			throw new NotFoundException('Transaction not found');
		}

		if (
			!isValidTransactionStatusTransition(transaction.status, nextStatus)
		) {
			throw new BadRequestException(
				`Invalid status transition from ${transaction.status} to ${nextStatus}`,
			);
		}

		return this.prisma.transaction.update({
			where: { id: transactionId },
			data: {
				status: nextStatus,
			},
		});
	}

	async getTransactions(query: GetTransactionsQueryDto) {
		const now = new Date();
		const fromDate = new Date(now);

		if (query.range === 'month') {
			fromDate.setMonth(now.getMonth() - 1);
		} else if (query.range === '3months') {
			fromDate.setMonth(now.getMonth() - 3);
		} else if (query.range === 'year') {
			fromDate.setFullYear(now.getFullYear() - 1);
		}

		const transactions = await this.prisma.transaction.findMany({
			where: {
				createdAt: {
					gte: fromDate,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return transactions.map((transaction) => ({
			transactionId: transaction.id,
			customerId: transaction.customerId,
			cardId: transaction.cardId,
			merchantName: transaction.merchantName,
			amountCents: Math.round(Number(transaction.amount) * 100),
			currency: transaction.currency,
			status: transaction.status,
			createdAt: transaction.createdAt,
		}));

	}

	async findByCustomerAndIdempotencyKey(
		customerId: string,
		idempotencyKey: string,
	) {
		return this.prisma.transaction.findUnique({
			where: {
				customerId_idempotencyKey: {
					customerId,
					idempotencyKey,
				},
			},
		});
	}
}