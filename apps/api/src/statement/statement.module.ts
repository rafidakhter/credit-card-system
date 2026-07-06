import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatementService } from './statement.service';

@Module({
	imports: [PrismaModule],
	providers: [StatementService],
	exports: [StatementService],
})
export class StatementModule {}