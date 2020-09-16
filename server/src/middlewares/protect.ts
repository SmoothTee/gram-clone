import { catchError } from '../utils';
import { AppError } from '../utils/appError';

export const protect = catchError((req, _res, next) => {
  if (!req.session || !req.session.userId) {
    throw new AppError(401, 'Invalid session');
  }

  next();
});
