import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: '咖啡名称' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '咖啡品牌' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: '咖啡风味，如[]' })
  @IsString({ each: true })
  readonly flovars: string[];
}
