import { Router } from 'express';

import { userController } from '../controllers';
// import { validate, validateSchemas } from '../middlewares';
// import { protect } from '../middlewares';

const router = Router();

router.route('/:user_id').put(userController.updateUser);
router.route('/username/:username').get(userController.readProfile);
router.patch('/change-password', userController.changePassword);

export const user = router;
