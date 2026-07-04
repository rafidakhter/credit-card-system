import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTransactionsQueryDto } from './dto/get-transaction.dto';

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) { }

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
}