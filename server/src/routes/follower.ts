import { Router } from 'express';

import { followerController } from '../controllers';
import { protect } from '../middlewares';

const router = Router();

router.get('/', protect, followerController.readFollowers);
router.get('/followings', protect, followerController.readFollowings);
router.get('/suggestions', protect, followerController.readSuggestions);
router.post('/follow', protect, followerController.follow);
router.post('/unfollow', protect, followerController.unfollow);

export const follower = router;
