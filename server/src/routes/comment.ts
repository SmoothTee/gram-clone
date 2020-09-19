import { Router } from 'express';

import { commentController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares';

const router = Router();

router
  .route('/')
  .post(
    protect,
    validate(validateSchemas.createComment, 'body'),
    commentController.createComment
  );

export const comment = router;
