import { Controller, Get, Query } from '@nestjs/common';
import { GetTransactionsQueryDto } from './dto/get-transaction.dto';
import { TransactionService } from './transaction.service';

import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) { }

  @ApiOperation({ summary: 'Get transaction history by date range' })
  @ApiQuery({ name: 'customerId', required: true })
  @ApiQuery({ name: 'range', required: true, enum: ['month', '3months', 'year'] })
  @ApiResponse({ status: 200, description: 'Transaction history returned successfully' })
  @Get()
  async getTransactions(@Query() query: GetTransactionsQueryDto) {
    return this.transactionsService.getTransactions(query);
  }
}