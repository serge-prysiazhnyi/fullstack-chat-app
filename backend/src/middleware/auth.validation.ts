import { check } from 'express-validator';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../constants';

export const loginValidation = [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    ),
];

export const registerValidation = [
  check('username')
    .isLength({ min: USERNAME_MIN_LENGTH })
    .withMessage('Username must be at least 2 characters long'),
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH,
    })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    ),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
