import { Router } from 'express';
import { accountsRoutes } from 'modules/accounts/infra/routes';
import { carsRoutes } from 'modules/cars/infra/routes';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const appRouter = Router();

appRouter.use(accountsRoutes);
appRouter.use(ensureAuthenticated);
appRouter.use(carsRoutes);

export { appRouter };
