import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategory';
import { Category } from '@modules/cars/infra/database/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    const { categories } = this;

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();

    Object.assign(newCategory, {
      name,
      description,
    });

    await this.categories.push(newCategory);
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}
