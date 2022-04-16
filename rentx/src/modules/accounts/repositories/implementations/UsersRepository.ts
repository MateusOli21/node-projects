import { ICreateUserDTO } from 'modules/accounts/dtos/ICreateUser';
import { User } from 'modules/accounts/infra/database/entities/User';
import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create({
    name,
    username,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create({
      name,
      username,
      email,
      password,
      driverLicense,
    });

    await this.repository.save(newUser);
  }
}
