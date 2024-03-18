import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffees/entities/coffee.entity';
import { Flovar } from './coffees/entities/flovar.entity';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nest_base',
      // entities: [
      //   'entities/*.ts'
      // ],
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
      entities: [Coffee, Flovar],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
