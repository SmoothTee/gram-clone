import { Router } from 'express';

import { followerController } from '../controllers';

const router = Router();

router.get('/suggestions', followerController.suggestions);

export const follower = router;
