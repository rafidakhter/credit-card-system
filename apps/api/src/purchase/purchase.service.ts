import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardStatus, TransactionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) { }

  async createPurchase(
    dto: CreatePurchaseDto,
    idempotencyKey: string,
  ): Promise<PurchaseResult> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const existingTransaction = await this.prisma.transaction.findUnique({
      where: {
        customerId_idempotencyKey: {
          customerId: dto.customerId,
          idempotencyKey,
        },
      },
    });

    if (existingTransaction) {
      const existingCard = await this.prisma.card.findUnique({
        where: { id: existingTransaction.cardId },
      });

      return {
        transactionId: existingTransaction.id,
        customerId: existingTransaction.customerId,
        cardId: existingTransaction.cardId,
        amountCents: Math.round(Number(existingTransaction.amount) * 100),
        currency: existingTransaction.currency,
        merchantName: existingTransaction.merchantName,
        status: 'APPROVED',
        availableLimitCents: existingCard
          ? Math.round(Number(existingCard.availableLimit) * 100)
          : 0,
        createdAt: existingTransaction.createdAt,
      };
    }

    const card = await this.prisma.card.findUnique({
      where: { id: dto.cardId },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (card.customerId !== dto.customerId) {
      throw new BadRequestException('Card does not belong to customer');
    }

    if (card.status !== CardStatus.ACTIVE) {
      throw new BadRequestException('Card is not active');
    }

    const purchaseAmount = dto.amountCents / 100;

    if (Number(card.availableLimit) < purchaseAmount) {
      throw new BadRequestException('Insufficient available limit');
    }

    const newAvailableLimit = Number(card.availableLimit) - purchaseAmount;

    const { transaction, updatedCard } = await this.prisma.$transaction(
      async (tx) => {
        const transaction = await tx.transaction.create({
          data: {
            customerId: dto.customerId,
            cardId: dto.cardId,
            merchantName: dto.merchantName,
            amount: purchaseAmount,
            currency: dto.currency,
            status: TransactionStatus.APPROVED,
            idempotencyKey,
          },
        });

        await tx.ledgerEvent.create({
          data: {
            transactionId: transaction.id,
            customerId: dto.customerId,
            cardId: dto.cardId,
            eventType: 'PURCHASE_APPROVED',
            amount: purchaseAmount,
            currency: dto.currency,
            metadata: {
              merchantName: dto.merchantName,
              merchantCategory: dto.merchantCategory ?? null,
            },
          },
        });

        const updatedCard = await tx.card.update({
          where: { id: card.id },
          data: {
            availableLimit: newAvailableLimit,
          },
        });

        return { transaction, updatedCard };
      },
    );

    return {
      transactionId: transaction.id,
      customerId: dto.customerId,
      cardId: dto.cardId,
      amountCents: dto.amountCents,
      currency: dto.currency,
      merchantName: dto.merchantName,
      status: 'APPROVED',
      availableLimitCents: Math.round(Number(updatedCard.availableLimit) * 100),
      createdAt: transaction.createdAt,
    };
  }
}