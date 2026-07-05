import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { HealthModule } from './health/health.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, '../.env.local'),
        resolve(__dirname, '../.env'),
      ],
    }),
    PrismaModule,
    HealthModule,
    PurchaseModule,
    TransactionModule,
    LedgerModule,
  ],
})
export class AppModule {}
