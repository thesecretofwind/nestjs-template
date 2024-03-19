import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Flovar } from './entities/flovar.entity';
import { Event } from 'src/event/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeResposity: Repository<Coffee>,
    @InjectRepository(Flovar)
    private readonly flovarReposity: Repository<Flovar>,
    private datasource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // return this.coffeeModel.find().skip(offset).limit(limit).exec();
    return this.coffeeResposity.find({
      relations: ['flovars'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeResposity.findOne({
      where: { id },
      relations: ['flovars'],
    });
    console.log(coffee);

    if (!coffee) {
      throw new NotFoundException(`coffee ${id} no found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flovars = await Promise.all(
      createCoffeeDto.flovars.map((name) => this.preloadFlovarByName(name)),
    );

    const coffee = this.coffeeResposity.create({
      ...createCoffeeDto,
      flovars,
    });
    return this.coffeeResposity.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flovars =
      updateCoffeeDto.flovars &&
      (await Promise.all(
        updateCoffeeDto.flovars.map((name) => this.preloadFlovarByName(name)),
      ));
    const coffee = await this.coffeeResposity.preload({
      id,
      ...updateCoffeeDto,
      flovars,
    });

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }
    return this.coffeeResposity.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeResposity.remove(coffee);
  }

  private async preloadFlovarByName(name: string) {
    const existingFlavor = await this.flovarReposity.findOne({
      where: { name: name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flovarReposity.create({ name: name });
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = JSON.stringify({ coffeeId: coffee.id });

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // async recommendCoffee(coffee: Coffee) {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     coffee.recommendations++;

  //     const recommendEvent = new this.eventModel({
  //       name: 'recommend_coffee',
  //       type: 'coffee',
  //       payload: { coffeeId: coffee.id },
  //     });
  //     await recommendEvent.save({ session });
  //     await coffee.save({ session });

  //     await session.commitTransaction();
  //   } catch (err) {
  //     await session.abortTransaction();
  //   } finally {
  //     session.endSession();
  //   }
  // }
}
