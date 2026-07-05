import { Body, Controller, Headers, Post, BadRequestException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseResult } from './types/purchase-result.type';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  @ApiOperation({ summary: 'Create a purchase' })
  @ApiHeader({
    name: 'Idempotency-Key',
    required: true,
    description: 'Unique key to prevent duplicate purchase creation',
  })
  @ApiResponse({ status: 201, description: 'Purchase created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request or business rule failure' })
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