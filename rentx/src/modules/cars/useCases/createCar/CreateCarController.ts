import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCar';

import { CreateCarUserCase } from './CreateCarUseCase';

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      brand,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      categoryId,
    }: ICreateCarDTO = req.body;

    const createCarUseCase = container.resolve(CreateCarUserCase);

    const newCar = await createCarUseCase.execute({
      name,
      brand,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      categoryId,
    });

    return res.status(201).json(newCar);
  }
}
