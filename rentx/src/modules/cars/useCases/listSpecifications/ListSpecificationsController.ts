import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listSpecificationsUseCase = container.resolve(
        ListSpecificationsUseCase
      );

      const specifications = await listSpecificationsUseCase.execute();

      return res.status(200).json(specifications);
    } catch {
      return res.status(500).send();
    }
  }
}
