import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDto } from './dto/restaurant.dto';


@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get('tag/:tag')
  findAllByTag(@Param('tag') tag: string) {
    return this.restaurantsService.findAllByTag(tag);
  }




}
