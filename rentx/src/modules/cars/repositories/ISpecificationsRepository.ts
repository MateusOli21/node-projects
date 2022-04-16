import { ICreateSpecificationDTO } from '../dtos/ICreateSpecification';
import { Specification } from '../infra/database/entities/Specification';

export interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}
