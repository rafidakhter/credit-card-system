import { IsIn, IsUUID } from 'class-validator';

export class GetTransactionsQueryDto {
	@IsIn(['month', '3months', 'year'])
	range!: 'month' | '3months' | 'year';

	@IsUUID()
	customerId!: string;
}