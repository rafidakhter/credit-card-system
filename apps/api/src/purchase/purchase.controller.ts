import { Body, Controller, Headers, Post, BadRequestException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(
    @Body() dto: CreatePurchaseDto,
    @Headers('idempotency-key') idempotencyKey: string,
  ): Promise<PurchaseResult> {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    return this.purchaseService.createPurchase(dto, idempotencyKey);
  }
}