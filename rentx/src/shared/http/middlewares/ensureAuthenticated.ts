import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from 'modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from 'shared/errors/AppError';

interface IVerifyResponse {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      '138463d006cd45335f9788b45027ea08'
    ) as IVerifyResponse;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    next();
  } catch {
    throw new AppError('Token invalid.', 401);
  }
}
