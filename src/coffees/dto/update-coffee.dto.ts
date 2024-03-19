import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

// 将传入的CreatecoffeeDto类中所有属性转为可选属性
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
