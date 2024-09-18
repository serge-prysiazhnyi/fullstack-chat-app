import { check } from 'express-validator';

export const messageValidation = [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message must not be empty'),
];
