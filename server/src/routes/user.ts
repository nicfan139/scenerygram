import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.post('/register', UserController.register);

export default router;
