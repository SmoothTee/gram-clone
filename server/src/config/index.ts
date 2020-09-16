import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  sessionName: process.env.SESSION_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  sessionLifetime: process.env.SESSION_LIFETIME,
};
