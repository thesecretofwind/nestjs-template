// import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
