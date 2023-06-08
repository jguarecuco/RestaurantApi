import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurant.repository';

import { RestaurantModule } from 'src/database/restaurant.module';

@Module({
  imports: [RestaurantModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository]
})
export class RestaurantsModule { }
