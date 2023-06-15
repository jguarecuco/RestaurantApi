import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsRepository } from './restaurant.repository';
import { RestaurantDto } from './dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly repository: RestaurantsRepository) { }
  create(createRestaurantDto: CreateRestaurantDto) {
    return this.repository.create(createRestaurantDto);
  }

  findAll(): Promise<Array<RestaurantDto>> {
    return this.repository.getAll();
  }
  findAllByTag(tags: string[]): Promise<Array<RestaurantDto>> {
    return this.repository.getByTags(tags);
  }

}
