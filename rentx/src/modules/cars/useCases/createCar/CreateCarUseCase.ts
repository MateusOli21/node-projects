import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateCarUserCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: ICreateCarDTO): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByPlate(
      data.licensePlate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists', 400);
    }

    await this.carsRepository.create(data);
  }
}
