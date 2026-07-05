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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({ example: '11111111-1111-4111-8111-111111111111' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ example: '22222222-2222-4222-8222-222222222222' })
  @IsUUID()
  cardId!: string;

  @ApiProperty({ example: 2599 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  amountCents!: number;

  @ApiProperty({ example: 'CAD' })
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/)
  currency!: string;

  @ApiProperty({ example: 'Amazon' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  merchantName!: string;

  @ApiPropertyOptional({ example: 'shopping' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  merchantCategory?: string;
}