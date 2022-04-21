import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUserCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUserCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const carOne: ICreateCarDTO = {
  name: 'car one',
  description: 'car one description',
  brand: 'ford',
  fineAmount: 50,
  dailyRate: 100,
  licensePlate: 'ABC-1234',
};

const carTwo: ICreateCarDTO = {
  name: 'car two',
  description: 'car two description',
  brand: 'ford',
  fineAmount: 50,
  dailyRate: 100,
  licensePlate: 'DEF-5678',
};

describe('Create new car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUserCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute(carOne);

    const createdCar = await carsRepositoryInMemory.findByPlate(
      carOne.licensePlate
    );

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a car with te same license plate', () => {
    expect(async () => {
      await createCarUseCase.execute(carOne);

      await createCarUseCase.execute({
        ...carTwo,
        licensePlate: carOne.licensePlate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
