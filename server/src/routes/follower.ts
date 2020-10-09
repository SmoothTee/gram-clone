import { Router } from 'express';

import { followerController } from '../controllers';
import { protect } from '../middlewares';

const router = Router();

router.get(
  '/followings/:follower_id',
  protect,
  followerController.readFollowings
);
router.get('/suggestions', protect, followerController.readSuggestions);
router.post('/follow', protect, followerController.follow);
router.post('/unfollow', protect, followerController.unfollow);
router.get('/:user_id', protect, followerController.readFollowers);

export const follower = router;
