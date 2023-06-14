import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Res } from '@nestjs/common';
import { CreateRestaurantDto, RestaurantDto } from './dto';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let RestaurantsServiceMock: jest.Mocked<RestaurantsService>;
  beforeEach(async () => {
    const ServiceMock: Partial<RestaurantsService> = {
      findAll: jest.fn(),
      create: jest.fn(),
      findAllByTag: jest.fn(async (tag: string) => {
        const result: RestaurantDto[] = [{
          id: '1',
          name: 'test',
          address: 'test',
          phone: 'test',
          email: 'test',
          tags: ['test'],
        }];

        return result.filter((restaurant: RestaurantDto) => restaurant.tags.includes(tag));
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RestaurantsService,
          useValue: ServiceMock,
        },
        RestaurantsController,
      ],
    }).compile();
    RestaurantsServiceMock = module.get(RestaurantsService);
    controller = module.get<RestaurantsController>(RestaurantsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe("findAll", () => {
    it('should return an array of restaurants', async () => {
      const result: RestaurantDto[] = [{
        id: '1',
        name: 'test',
        address: 'test',
        phone: 'test',
        email: 'test',
        tags: ['test'],

      }];
      RestaurantsServiceMock.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });
  describe("findAllByTag", () => {
    it('should return an array of restaurants', async () => {
      const result: RestaurantDto[] = [{
        id: '1',
        name: 'test',
        address: 'test',
        phone: 'test',
        email: 'test',
        tags: ['test'],
      }];
      RestaurantsServiceMock.findAllByTag.mockResolvedValue(result);
      expect(await controller.findAllByTag('test')).toBe(result);
    });
  });
  it('should return an array of restaurants empty', async () => {
    const result: RestaurantDto[] = [{
      id: '1',
      name: 'test',
      address: 'test',
      phone: 'test',
      email: 'test',
      tags: ['test'],
    }];

    RestaurantsServiceMock.findAllByTag.mockResolvedValue(result);
    expect(await controller.findAllByTag(null)).toBe(result);
  });
  describe("create", () => {
    it('should return an array of restaurants', async () => {
      const result: RestaurantDto = {
        id: '',
        name: 'test',
        address: 'test',
        phone: 'test',
        email: 'test',
        tags: ['test'],
      };
      const post: RestaurantDto = {
        id: '',
        name: 'test',
        address: 'test',
        phone: 'test',
        email: 'test',
        tags: ['test'],
      };
      RestaurantsServiceMock.create.mockResolvedValue(result);
      expect(await controller.create(post)).toBe(result);
    });
  });
});

