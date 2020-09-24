import { Router } from 'express';

import { userController } from '../controllers';
// import { validate, validateSchemas } from '../middlewares';
// import { protect } from '../middlewares';

const router = Router();

router.get('/:username', userController.readProfile);

export const user = router;
