import multer from 'multer';
import { Router } from 'express';

import { postController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route('/')
  .post(
    protect,
    upload.array('media', 5),
    validate(validateSchemas.createPost, 'body'),
    postController.createPost
  )
  .get(postController.readPosts);
router.post(
  '/like',
  protect,
  validate(validateSchemas.likePost, 'body'),
  postController.likePost
);
router.post(
  '/unlike',
  protect,
  validate(validateSchemas.unlikePost, 'body'),
  postController.unlikePost
);
router.post('/save', protect, postController.savePost);
router.post('/unsave', protect, postController.unsavePost);

export const post = router;
