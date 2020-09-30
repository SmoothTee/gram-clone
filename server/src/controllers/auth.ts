import { catchError } from '../utils';
import { authService } from '../services';
import { config } from '../config';

export const register = catchError(async (req, res) => {
  const user = await authService.register(req.body);

  req.session.userId = user.id;

  res.json({ user });
});

export const login = catchError(async (req, res) => {
  const user = await authService.login(req.body);

  req.session.userId = user.id;

  res.json({ user });
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
  const user = await authService.me(req.session.userId);

  res.json({ user });
});

export const githubLogin = catchError(async (req, res) => {
  const user = await authService.githubLogin(req.body.code);

  req.session.userId = user.id;

  res.json({ user });
});

export const forgotPassword = catchError(async (req, res) => {
  const success = await authService.forgotPassword(req.body.email);

  res.json({ success });
});

export const resetPassword = catchError(async (req, res) => {
  const { newPassword, token } = req.body;

  const user = await authService.resetPassword(newPassword, token);

  req.session.userId = user.id;

  res.json({ user });
});
