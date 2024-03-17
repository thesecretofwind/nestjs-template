import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CoffeesService {
  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: 'coffees',
  //     brand: 'brand',
  //     flovars: ['flovar1', 'flovar2'],
  //   },
  // ];

  constructor(@InjectRepository(Coffee) private readonly coffeeRespository: Repository<Coffee>) {}

  findAll() {
    // return this.coffees;
    return this.coffeeRespository.find({relations: ['Flovar']});
  }

  async findOne(id: string) {
    // console.log(id);
    const name = 'coffee 1'
    const coffee = await this.coffeeRespository.findOne({where: {
      _id: new ObjectId(id)
    }})
    console.log(coffee);
    
    if (!coffee) {
      // throw new HttpException('xxx', HttpStatus.NOT_FOUND)
      throw new NotFoundException(`coffee ${id} no found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // this.coffees.push(createCoffeeDto);
    const coffee = this.coffeeRespository.create(createCoffeeDto);
    return this.coffeeRespository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRespository.preload({
      _id: new ObjectId(id),
      ...updateCoffeeDto
    });
    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`)
    }
    return this.coffeeRespository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.coffeeRespository.findOne({where: {_id: new ObjectId(id)}});
    return this.coffeeRespository.remove(coffee)
  }
}
