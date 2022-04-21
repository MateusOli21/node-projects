import { getRepository, Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { Car } from '@modules/cars/infra/database/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async list(): Promise<Car[]> {
    return this.repository.find();
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const newCar = this.repository.create(data);

    await this.repository.save(newCar);

    return newCar;
  }

  async findByPlate(plate: string): Promise<Car> {
    return this.repository.findOne({ where: { licensePlate: plate } });
  }

  async findAvailable(
    name?: string,
    brand?: string,
    categoryId?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (categoryId) {
      carsQuery.andWhere('c.categoryId = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}
