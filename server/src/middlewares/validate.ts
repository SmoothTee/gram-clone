import Joi, { ObjectSchema, ValidationError } from 'joi';
import { Request } from 'express';

import { catchError } from '../utils';
import { RequestHandler } from 'express';
import { AppError } from '../utils/appError';

export const validateSchemas = {
  register: Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().min(2).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  }),
  login: Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required(),
  }),
  createPost: Joi.object({
    caption: Joi.string().max(2200).required(),
  }),
  createComment: Joi.object({
    parent_id: Joi.number(),
    post_id: Joi.number().required(),
    text: Joi.string().max(300).required(),
  }),
  votePost: Joi.object({
    post_id: Joi.number().required(),
    vote: Joi.number().valid(1, -1).required(),
  }),
  voteComment: Joi.object({
    comment_id: Joi.number().required(),
    vote: Joi.number().valid(1, -1).required(),
  }),
  likeComment: Joi.object({
    commentId: Joi.number().required(),
  }),
  unlikeComment: Joi.object({
    commentId: Joi.number().required(),
  }),
  likePost: Joi.object({
    postId: Joi.number().required(),
  }),
  unlikePost: Joi.object({
    postId: Joi.number().required(),
  }),
};

export const validate = (
  schema: ObjectSchema,
  prop: keyof Request
): RequestHandler =>
  catchError((req, _res, next) => {
    const { error } = schema.validate(req[prop], { abortEarly: false });
    if (error) {
      throw new AppError(422, 'Invalid input values.', formatError(error));
    }

    next();
  });

const formatError = (error: ValidationError) => {
  return error.details.reduce<{ [key: string]: string }>((acc, curr) => {
    acc[curr.path[0]] = curr.message;
    return acc;
  }, {});
};
