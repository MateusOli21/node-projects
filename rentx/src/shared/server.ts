import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { appRouter } from 'shared/http/routes';
import { createPostgresConnection } from 'shared/database';

import 'shared/container';

import swaggerFile from './docs/swagger.json';
import { catchErrors } from './errors/catchErrors';

createPostgresConnection().then(() => console.log('Database connected!'));

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(appRouter);
app.use(catchErrors);

app.listen(3333);
