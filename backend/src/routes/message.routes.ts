import express from 'express';
import protectRoute from '../middleware/protectRoute';
import validateRequest from '../middleware/validateRequest';
import { sendMessage, getMessages } from '../controllers/message.controller';
import { messageValidation } from '../middleware/message.validation';

const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.post(
  '/send/:id',
  protectRoute,
  messageValidation,
  validateRequest,
  sendMessage,
);

export default router;
