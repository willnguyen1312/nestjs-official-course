import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeeBrandsDactory {
  async create() {
    return ['buddy brew', 'nestcafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    ConfigService,
    CoffeeBrandsDactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (brandFactory: CoffeeBrandsDactory) => {
        console.log(123);
        return brandFactory.create();
      },
      inject: [CoffeeBrandsDactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
