import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from 'modules/accounts/dtos/ICreateUser';
import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { AppError } from 'shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('E-mail already has an account', 400);
    }

    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHash,
      driverLicense,
    });
  }
}

export { CreateUserUseCase };
