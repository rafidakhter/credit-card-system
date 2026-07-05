import { IsIn, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class GetTransactionsQueryDto {
	@ApiProperty({ example: 'month', enum: ['month', '3months', 'year'] })
	@IsIn(['month', '3months', 'year'])
	range!: 'month' | '3months' | 'year';

	@ApiProperty({ example: '11111111-1111-4111-8111-111111111111' })
	@IsUUID()
	customerId!: string;
}