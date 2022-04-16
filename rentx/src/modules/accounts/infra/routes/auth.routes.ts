import { Router } from 'express';
import { authenticateUserController } from 'modules/accounts/useCases/authenticateUser';

const authRoutes = Router();

authRoutes.post('/', authenticateUserController.handle);

export { authRoutes };
