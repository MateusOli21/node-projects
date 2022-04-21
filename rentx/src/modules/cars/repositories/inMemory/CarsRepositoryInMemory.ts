import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { Car } from '@modules/cars/infra/database/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === plate);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const newCar = new Car();

    Object.assign(newCar, data);

    this.cars.push(newCar);

    return newCar;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    categoryId?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId)
    );

    return cars;
  }
}
