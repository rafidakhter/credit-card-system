import { Controller, Get, Query } from '@nestjs/common';
import { GetTransactionsQueryDto } from './dto/get-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) { }

  @Get()
  async getTransactions(@Query() query: GetTransactionsQueryDto) {
    return this.transactionsService.getTransactions(query);
  }
}