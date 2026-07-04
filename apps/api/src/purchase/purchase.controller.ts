import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  async createPurchase(@Body() dto: CreatePurchaseDto): Promise<PurchaseResult> {
    return this.purchaseService.createPurchase(dto);
  }
}