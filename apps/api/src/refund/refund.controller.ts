import { Body, Controller, Param, Patch } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundTransactionDto } from './dto/refund-transaction-dto';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) { }

  @Patch(':transactionId')
  async refundTransaction(
    @Param('transactionId') transactionId: string,
    @Body() dto: RefundTransactionDto,
  ) {
    return this.refundService.refundTransaction(
      transactionId,
      dto.customerId,
      dto.idempotencyKey,
    );
  }
}