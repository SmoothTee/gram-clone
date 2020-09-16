import { ErrorRequestHandler } from 'express';

import { AppError } from '../utils/appError';
import { __prod__ } from '../constants';

export const error: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message, data: err.data });
    return;
  }

  if (!__prod__) {
    console.log(err);
  }

  res.status(500).json({
    message: 'Something went wrong on the server. Please contact our support.',
  });
};
