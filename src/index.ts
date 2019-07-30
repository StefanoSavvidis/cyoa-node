import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import cookieParser from 'cookie-parser';
import {createConnection} from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import {redis} from './redis';
import {createSchema} from './utils/createSchema';

import {
  authSpotify,
  authSpotifyCallback,
} from './routes/auth/spotify/SpotifyAuth';

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({req, res}: any) => ({req, res}),
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.options('http://localhost:3000/', cors());

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'apollo',
      secret: 'dsadj1jejd12j',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    }),
  );

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  apolloServer.applyMiddleware({app, cors: false});

  app.get('/auth/spotify', cookieParser(), authSpotify);

  app.get('/auth/spotify/callback', cookieParser(), authSpotifyCallback);

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql');
  });
};

main();
