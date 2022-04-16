import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { AppError } from 'shared/errors/AppError';

interface IExecuteResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(email: string, password: string): Promise<IExecuteResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      console.log('aqui');
      throw new AppError('User or email incorrect.', 400);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      console.log('ali');
      throw new AppError('User or email incorrect.', 400);
    }

    const token = sign({}, '138463d006cd45335f9788b45027ea08', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
