import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().reduce((acc, curr, index) => {
      if (index === 0) {
        return (acc += curr.msg);
      }

      return (acc += `, ${curr.msg}`);
    }, '');

    return res.status(400).json(errorMessages);
  }

  next();
};

export default validateRequest;
