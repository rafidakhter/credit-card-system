import { Module } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CreditCardService],
  exports: [CreditCardService],
})
export class CreditCardModule {}
