import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';

@Injectable()
export class PurchaseService {
  async createPurchase(dto: CreatePurchaseDto): Promise<PurchaseResult> {
    return {
      transactionId: 'temp-transaction-id',
      customerId: dto.customerId,
      cardId: dto.cardId,
      amountCents: dto.amountCents,
      currency: dto.currency,
      merchantName: dto.merchantName,
      status: 'APPROVED',
      availableLimitCents: 500000,
      createdAt: new Date(),
    };
  }
}