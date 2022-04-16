import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from 'modules/cars/repositories/ISpecificationsRepository';
import { Specification } from 'modules/cars/infra/database/entities/Specification';

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}
