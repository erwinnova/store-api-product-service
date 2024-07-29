import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  price: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
