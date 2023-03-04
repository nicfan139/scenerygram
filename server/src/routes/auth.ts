import { Router } from 'express';
import AuthController from '../controllers/auth';

const router = Router();

router.post('/login', AuthController.login);

router.post('/validate_token', AuthController.validateToken);

export default router;
