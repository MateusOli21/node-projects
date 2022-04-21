import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUser';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

const newUser: ICreateUserDTO = {
  name: 'user test',
  username: 'userTest',
  email: 'user@test.com',
  password: '123456',
  driverLicense: '123456',
};

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate a user', async () => {
    await createUserUseCase.execute(newUser);

    const response = await authenticateUserUseCase.execute(
      newUser.email,
      newUser.password
    );

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate when e-mail does not exists', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute('fakeEmail@test.com', '123456');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate when password is wrong', () => {
    expect(async () => {
      await createUserUseCase.execute(newUser);

      await authenticateUserUseCase.execute(newUser.email, '654321');
    }).rejects.toBeInstanceOf(AppError);
  });
});
