import express from 'express';
import cors from 'cors';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

import { config } from './config';
import { routes } from './routes';
import { __prod__ } from './constants';
import { error } from './middlewares';

const initializeExpress = () => {
  const app = express();
  const redisStore = connectRedis(session);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      name: config.sessionName,
      secret: config.sessionSecret,
      saveUninitialized: false,
      resave: false,
      store: new redisStore({
        client: new Redis(),
        ttl: Number(config.sessionLifetime) / 1000,
      }),
      cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: Number(config.sessionLifetime),
        secure: __prod__,
      },
    })
  );

  app.use('/api', routes);

  app.use(error);

  app.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
  );
};

initializeExpress();
