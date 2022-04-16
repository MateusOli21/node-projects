import { Router } from 'express';
import { createCategoryController } from 'modules/cars/useCases/createCategory';
import { listCategoriesController } from 'modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', createCategoryController.handle);

export { categoriesRoutes };
