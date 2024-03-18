import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
// import { Flovar } from './entities/flovar.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/event/event.entity';

// 由于其他模块不需要controller或service，因此不用exports导出
@Module({
  imports: [
    // TypeOrmModule.forFeature([Coffee, Flovar])
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
