import { Request, Response } from 'express';
import { ICreateUserDTO } from 'modules/accounts/dtos/ICreateUser';
import { AppError } from 'shared/errors/AppError';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, username, email, password, driverLicense }: ICreateUserDTO =
        req.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        username,
        email,
        password,
        driverLicense,
      });

      return res.status(201).send();
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err?.status).json({ message: err.message });
      }

      return res.status(500).json({ message: err });
    }
  }
}
