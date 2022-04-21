import { createCarController } from '@modules/cars/useCases/createCar';
import { Router } from 'express';

const carsRoutes = Router();

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
