import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin, createTagController.handle);
router.post('/compliments', createComplimentController.handle);
router.post('/login', authUserController.handle);

export { router };
