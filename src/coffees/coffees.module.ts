import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flovar } from './entities/flovar.entity';

// 由于其他模块不需要controller或service，因此不用exports导出
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flovar])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
