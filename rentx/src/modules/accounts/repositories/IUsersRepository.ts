import { ICreateUserDTO } from '../dtos/ICreateUser';
import { User } from '../infra/database/entities/User';

export interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<void>;
}
