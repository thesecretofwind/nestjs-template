import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flovar } from './entities/flovar.entity';
import { Coffee } from './entities/coffee.entity';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
// import { Event } from 'src/event/event.entity';
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe('CoffeeService', () => {
  let service: CoffeesService;
  let coffeeResposity: MockRepository;
  //   let flovarReposity: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flovar),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        // {
        //   provide: getRepositoryToken(Event),
        //   useValue: {},
        // },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeResposity = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined;
  });

  describe('findOne', () => {
    describe('when coffee with id exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeResposity.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(+coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw th "NotFoundException"', async () => {
        const coffeeId = 1;
        coffeeResposity.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`coffee ${coffeeId} no found`);
        }
      });
    });
  });
});
