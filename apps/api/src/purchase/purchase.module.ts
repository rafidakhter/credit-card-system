import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { LedgerModule } from 'src/ledger/ledger.module';

@Module({
  imports: [PrismaModule, LedgerModule, TransactionModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }