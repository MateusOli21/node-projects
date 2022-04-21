import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { CreateCarUserCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUserCase;

const baseCar: ICreateCarDTO = {
  name: 'carThree',
  description: 'carOne description',
  dailyRate: 50,
  licensePlate: 'GHI-1234',
  fineAmount: 100,
  brand: 'audi',
};

describe('List available cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUserCase(carsRepositoryInMemory);
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should list all available cars', async () => {
    const newCar = await createCarUseCase.execute(baseCar);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([newCar]);
  });
});
