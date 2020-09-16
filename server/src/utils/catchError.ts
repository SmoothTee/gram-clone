import { RequestHandler } from 'express';

export const catchError = (
  requestHandler: RequestHandler
): RequestHandler => async (req, res, next) => {
  try {
    return await requestHandler(req, res, next);
  } catch (err) {
    next(err);
  }
};
