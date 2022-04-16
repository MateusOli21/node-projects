import { getRepository, Repository } from 'typeorm';
import { ICreateSpecificationDTO } from 'modules/cars/dtos/ICreateSpecification';
import { Specification } from 'modules/cars/infra/database/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const newSpecification = await this.repository.create({
      name,
      description,
    });

    this.repository.save(newSpecification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}
