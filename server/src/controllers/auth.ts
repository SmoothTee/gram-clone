import { catchError } from '../utils';
import { authService } from '../services';
import { config } from '../config';

export const register = catchError(async (req, res) => {
  const user = await authService.register(req.body);

  req.session.userId = user.id;

  res.json({ user });
});

export const login = catchError(async (req, res) => {
  const { user, memberCommunity } = await authService.login(req.body);

  req.session.userId = user.id;

  res.json({ user, memberCommunity });
});

export const logout = catchError(async (req, res) => {
  const success = await new Promise((resolve) => {
    req.session.destroy((err) => {
      if (err) {
        resolve(false);
      }
      res.clearCookie(config.sessionName);
      resolve(true);
    });
  });
  res.json({ success });
});

export const me = catchError(async (req, res) => {
  const data = await authService.me(req.session.userId);

  res.json(data);
});
