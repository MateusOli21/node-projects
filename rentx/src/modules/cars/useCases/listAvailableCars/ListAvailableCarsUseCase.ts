import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/database/entities/Car';

interface IRequest {
  name?: string;
  brand?: string;
  categoryId?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(name, brand, categoryId);

    return cars;
  }
}
