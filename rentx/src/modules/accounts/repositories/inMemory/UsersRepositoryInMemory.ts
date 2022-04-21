import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUser';
import { User } from '@modules/accounts/infra/database/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async create(data: ICreateUserDTO): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, data);

    this.users.push(newUser);
  }
}
