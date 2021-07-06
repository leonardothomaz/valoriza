import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post(
    '/tags',
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle,
);
router.post(
    '/compliments',
    ensureAuthenticated,
    createComplimentController.handle,
);
router.post('/login', authUserController.handle);

export { router };
