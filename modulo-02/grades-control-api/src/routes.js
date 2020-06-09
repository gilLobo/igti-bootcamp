import { Router } from 'express';

import GradeController from './app/controllers/GradeController';
import MediaController from './app/controllers/MediaController';
import AlunoController from './app/controllers/AlunoController';
import TopGradeController from './app/controllers/TopGradeController';

const routes = new Router();

// Routes grade
routes.post('/grade', GradeController.store);
routes.get('/grade', GradeController.index);
routes.get('/grade/:id', GradeController.getById);
routes.put('/grade', GradeController.update);
routes.delete('/grade/:id', GradeController.remove);

// Routes media
routes.get('/media', MediaController.getMedia);

// Routes aluno
routes.get('/aluno', AlunoController.getNota);

// Routes
routes.get('/topgrade', TopGradeController.getTopGrade);

export default routes;
