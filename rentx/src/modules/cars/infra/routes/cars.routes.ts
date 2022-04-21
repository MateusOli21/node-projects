import { createCarController } from '@modules/cars/useCases/createCar';
import { listAvailableCarsController } from '@modules/cars/useCases/listAvailableCars';
import { Router } from 'express';

const carsRoutes = Router();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
