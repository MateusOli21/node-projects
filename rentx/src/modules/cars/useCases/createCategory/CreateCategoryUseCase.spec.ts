import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

const newCategory = {
  name: 'category test',
  description: 'category description',
};

describe('Create new category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should create a new category', async () => {
    await createCategoryUseCase.execute(newCategory);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      newCategory.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create categories with the same name', () => {
    expect(async () => {
      await createCategoryUseCase.execute(newCategory);
      await createCategoryUseCase.execute(newCategory);
    }).rejects.toBeInstanceOf(AppError);
  });
});
