import { IsString, Length, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  handle: string;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  description: string;

  @IsString()
  sku: string;

  @IsNumber()
  grams: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsNumber()
  compareprice: number;

  @IsString()
  barcode: string;
}
