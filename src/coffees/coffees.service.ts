import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'coffees',
      brand: 'brand',
      flovars: ['flovar1', 'flovar2'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    return this.coffees.find((coffee) => coffee.id === id);
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: number, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update this exsting entity;
    }
  }

  remove(id: number) {
    this.coffees = this.coffees.filter((coffee) => coffee.id !== id);
  }
}

