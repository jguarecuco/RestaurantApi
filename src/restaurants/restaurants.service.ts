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
  findAllByTag(tag: string): Promise<Array<RestaurantDto>> {
    return this.repository.getByTag(tag);
  }
  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }



  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
