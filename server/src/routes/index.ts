import { Router } from 'express';

import { auth } from './auth';
import { post } from './post';
import { comment } from './comment';
import { user } from './user';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/comment', comment);
router.use('/user', user);

export const routes = router;
