// import { IsString } from 'class-validator';

import { Flovar } from "../entities/flovar.entity";

export class CreateCoffeeDto {
  // @IsString()
  readonly name: string;
  // @IsString()
  readonly brand: string;
  // @IsString({ each: true })
  readonly flovars: string[];
}
