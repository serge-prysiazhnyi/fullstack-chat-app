import { check } from 'express-validator';

export const messageValidation = [
  check('content')
    .isLength({ min: 1 })
    .withMessage('Message must not be empty'),
];
