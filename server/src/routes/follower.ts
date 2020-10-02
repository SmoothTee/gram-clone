import { Router } from 'express';

import { followerController } from '../controllers';
import { protect } from '../middlewares';

const router = Router();

router.get('/suggestions', protect, followerController.suggestions);
router.post('/follow', protect, followerController.follow);
router.post('/unfollow', followerController.unfollow);

export const follower = router;
