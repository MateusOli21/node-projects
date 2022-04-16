import { Router } from 'express';
import { createSpecificationController } from 'modules/cars/useCases/createSpecification';
import { listSpecificationsController } from 'modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
