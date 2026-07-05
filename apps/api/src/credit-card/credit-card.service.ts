import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Card, CardStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreditCardService {
	constructor(private readonly prisma: PrismaService) { }

	async getCardByIdOrThrow(cardId: string): Promise<Card> {
		const card = await this.prisma.card.findUnique({
			where: { id: cardId },
		});

		if (!card) {
			throw new NotFoundException('Card not found');
		}

		return card;
	}

	assertCardBelongsToCustomer(card: Card, customerId: string): void {
		if (card.customerId !== customerId) {
			throw new BadRequestException('Card does not belong to customer');
		}
	}

	assertCardIsActive(card: Card): void {
		if (card.status !== CardStatus.ACTIVE) {
			throw new BadRequestException('Card is not active');
		}
	}

	assertSufficientAvailableLimit(card: Card, purchaseAmount: number): void {
		if (Number(card.availableLimit) < purchaseAmount) {
			throw new BadRequestException('Insufficient available limit');
		}
	}

	async updateAvailableLimit(
		tx: Prisma.TransactionClient,
		cardId: string,
		newAvailableLimit: number,
	): Promise<Card> {
		return tx.card.update({
			where: { id: cardId },
			data: {
				availableLimit: newAvailableLimit,
			},
		});
	}
}
