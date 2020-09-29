import { config } from '../config';

export const __prod__ = config.env === 'production';

export const FORGOT_PASSWORD_PREFIX = 'forgot-password:';
