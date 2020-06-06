import { Router } from 'express';

import AccountController from './app/controllers/AccountController';

const routes = new Router();

routes.post('/account', AccountController.store);
routes.get('/account', AccountController.index);
routes.get('/account/:id', AccountController.getById);

export default routes;
