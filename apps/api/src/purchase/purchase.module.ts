import { Module } from '@nestjs/common'
import { PurchaseController } from './purchase.controller'
import { PurchaseService } from './purchase.service'
import { PrismaModule } from '../prisma/prisma.module'
import { TransactionModule } from 'src/transaction/transaction.module'
import { LedgerModule } from 'src/ledger/ledger.module'
import { CreditCardModule } from 'src/credit-card/credit-card.module'
import { CustomerModule } from 'src/customer/customer.module'
import { AuditModule } from 'src/audit/audit.module'

@Module({
  imports: [PrismaModule, LedgerModule, TransactionModule, CreditCardModule, CustomerModule, AuditModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }