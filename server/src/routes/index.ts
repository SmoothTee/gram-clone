import { Router } from 'express';

import { auth } from './auth';
import { post } from './post';
import { comment } from './comment';
import { user } from './user';
import { follower } from './follower';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/comment', comment);
router.use('/user', user);
router.use('/follower', follower);

export const routes = router;
