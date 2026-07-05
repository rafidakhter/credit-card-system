import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardStatus, TransactionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';
import { LedgerService } from 'src/ledger/ledger.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreditCardService } from 'src/credit-card/credit-card.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService,
    private readonly ledgerService: LedgerService,
    private readonly creditCardService: CreditCardService,
  ) { }

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

    // validate card and customer relationship, card status, and available limit
    const card = await this.creditCardService.getCardOrThrow(dto.cardId);
    this.creditCardService.assertCardBelongsToCustomer(card, dto.customerId);
    this.creditCardService.assertCardIsActive(card);
    const purchaseAmount = dto.amountCents / 100;
    this.creditCardService.assertSufficientAvailableLimit(card, purchaseAmount);

    const newAvailableLimit = Number(card.availableLimit) - purchaseAmount;

    const { transaction, updatedCard } = await this.prisma.$transaction(
      async (tx) => {

        const transaction = await this.transactionService.createApprovedPurchaseTransaction(
          tx,
          {
            customerId: dto.customerId,
            cardId: dto.cardId,
            merchantName: dto.merchantName,
            amount: purchaseAmount,
            currency: dto.currency,
            idempotencyKey,
          },
        )

        await this.ledgerService.createPurchaseApprovedLedgerEvent(tx, {
          transactionId: transaction.id,
          customerId: dto.customerId,
          cardId: dto.cardId,
          amount: purchaseAmount,
          currency: dto.currency,
          merchantName: dto.merchantName,
          merchantCategory: dto.merchantCategory,
        });


        const updatedCard = await this.creditCardService.updateAvailableLimit(
          tx,
          card.id,
          newAvailableLimit,
        );

        return { transaction, updatedCard };
      },
    )

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
    }
  }

}