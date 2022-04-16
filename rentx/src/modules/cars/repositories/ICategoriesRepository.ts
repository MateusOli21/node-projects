import { Category } from 'modules/cars/infra/database/entities/Category';

import { ICreateCategoryDTO } from '../dtos/ICreateCategory';

export interface ICategoriesRepository {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
