import { userService } from '../services';
import { catchError } from '../utils';

export const readProfile = catchError(async (req, res) => {
  const profile = await userService.readProfile(req.params.username);

  res.json(profile);
});
