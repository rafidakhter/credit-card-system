import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionModule } from '../transaction/transaction.module';
import { CreditCardModule } from '../credit-card/credit-card.module';
import { LedgerModule } from '../ledger/ledger.module';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';

@Module({
  imports: [
    PrismaModule,
    TransactionModule,
    CreditCardModule,
    LedgerModule,
  ],
  controllers: [RefundController],
  providers: [RefundService],
  exports: [RefundService],
})
export class RefundModule { }