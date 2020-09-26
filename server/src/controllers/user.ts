import { userService } from '../services';
import { catchError } from '../utils';

export const readProfile = catchError(async (req, res) => {
  const profile = await userService.readProfile(req.params.username);

  res.json(profile);
});

export const updateUser = catchError(async (req, res) => {
  const user = await userService.updateUser(
    req.body,
    Number(req.params.user_id)
  );

  res.json({ user });
});

export const changePassword = catchError(async (req, res) => {
  const user = await userService.changePassword(req.body, req.session.userId);

  res.json({ user });
});
