import express from 'express';

import {
  loginValidation,
  registerValidation,
} from '../middleware/auth.validation';
import validateRequest from '../middleware/validateRequest';
import { register, login, logout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);

router.post('/login', loginValidation, validateRequest, login);

router.post('/logout', logout);

export default router;
