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
router.post(
  '/like',
  validate(validateSchemas.likeComment, 'body'),
  protect,
  commentController.likeComment
);
router.post(
  '/unlike',
  protect,
  validate(validateSchemas.unlikeComment, 'body'),
  commentController.unlikeComment
);

export const comment = router;
