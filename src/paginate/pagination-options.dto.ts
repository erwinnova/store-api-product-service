import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Max(50)
  size: number;
}
