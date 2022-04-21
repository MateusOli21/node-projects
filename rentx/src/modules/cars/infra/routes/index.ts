import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const carsRouter = Router();

carsRouter.use('/categories', categoriesRoutes);
carsRouter.use('/specifications', specificationsRoutes);
carsRouter.use('/cars', carsRoutes);

export { carsRouter };
