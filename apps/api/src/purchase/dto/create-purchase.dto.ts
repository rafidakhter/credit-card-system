import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  customerId!: string;

  @IsUUID()
  cardId!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  amountCents!: number;

  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currency!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  merchantName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  merchantCategory?: string;
}