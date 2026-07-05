import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class RefundTransactionDto {
  @IsUUID()
  customerId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  idempotencyKey!: string;
}