import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { CreateRestaurantDto, RestaurantDto } from './dto';

import { TABLE_NAME_TOKEN } from '../database/restaurant.module';


@Injectable()
export class RestaurantsRepository {
  constructor(
    @Inject(TABLE_NAME_TOKEN) private readonly tableName: string,
    private readonly client: AWS.DynamoDB.DocumentClient,
  ) { }

  async getAll(): Promise<Array<RestaurantDto>> {
    const result = await this.client.scan({ TableName: this.tableName }).promise();
    return (result.Items as Array<RestaurantDto>);
  }
  async getByTags(tags: string[]): Promise<Array<RestaurantDto>> {
    const results: RestaurantDto[] = [];
    for (const tag of tags) {
      const params = {
        ExpressionAttributeValues: {
          ':tag': {
            "S": tag.toUpperCase
          }
        },
        TableName: this.tableName,

        FilterExpression: '#tags = :tag',
        ExpressionAttributeNames: { '#tags': 'tags' },
      };


      const result = await this.client.scan(params).promise();

      results.push(...(result.Items as Array<RestaurantDto>));
    }

    return [...new Map(results.map(item =>
      [item["id"], item])).values()];

  }
  async get(id: string): Promise<RestaurantDto> {
    const { Item } = await this.client
      .get({ TableName: this.tableName, Key: { PK: id, SK: '#RESTAURANT' } })
      .promise();
    if (!Item) return null;

    const restaurant = new RestaurantDto();
    restaurant.id = id;
    restaurant.name = Item.name;
    restaurant.address = Item.address;
    restaurant.phone = Item.phone;
    restaurant.email = Item.email;
    restaurant.tags = Item.tags;
    return restaurant;
  }

  async create(restaurant: CreateRestaurantDto): Promise<RestaurantDto> {
    const id = uuid();
    const item = { PK: id, SK: '#RESTAURANT', ...restaurant };
    await this.client.put({ TableName: this.tableName, Item: item }).promise();
    return { id, ...restaurant };
  }



  async delete(id: string): Promise<RestaurantDto> {
    const restaurant = await this.get(id);
    if (restaurant) await this.client
      .delete({ TableName: this.tableName, Key: { PK: id, SK: "#RESTAURANT" } })
      .promise();
    return restaurant;
  }
}
