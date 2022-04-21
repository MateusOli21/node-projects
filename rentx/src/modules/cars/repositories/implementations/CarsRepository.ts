import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { Car } from '@modules/cars/infra/database/entities/Car';
import { getRepository, Repository } from 'typeorm';

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
}
