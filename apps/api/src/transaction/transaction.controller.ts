import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GetTransactionsQueryDto } from './dto/get-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-statud.dto';


@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) { }

  @Get()
  async getTransactions(@Query() query: GetTransactionsQueryDto) {
    return this.transactionsService.getTransactions(query);
  }

  @Patch(':id/status')
  async updateTransactionStatus(
    @Param('id') transactionId: string,
    @Body() dto: UpdateTransactionStatusDto,
  ) {
    return this.transactionsService.updateTransactionStatus(
      transactionId,
      dto.status,
    );
  }
}