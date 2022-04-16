import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';

const accountsRoutes = Router();

accountsRoutes.use('/users', usersRoutes);
accountsRoutes.use('/session', authRoutes);

export { accountsRoutes };
