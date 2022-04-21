import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

interface IRequestQueries {
  name: string;
  brand: string;
  categoryId: string;
}

export class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const { name, brand, categoryId } = req.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      name,
      brand,
      categoryId,
    } as IRequestQueries);

    return res.status(200).json(cars);
  }
}
