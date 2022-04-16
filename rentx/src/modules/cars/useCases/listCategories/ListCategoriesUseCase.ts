import { inject, injectable } from 'tsyringe';
import { Category } from 'modules/cars/infra/database/entities/Category';
import { ICategoriesRepository } from 'modules/cars/repositories/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
