import "reflect-metadata";
require('dotenv').config()
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import logger from './utils/logger'
import { redis } from "./redis";
// import { logger } from "./modules/middleware/logger";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.resolver.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

  // TODO: add formatError
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  // TODO: add secret to env file
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  // TODO: add port to env file
  app.listen(4000, () => {
    // TODO: add winston logger
    logger.info("server started on http://localhost:4000/graphql");
  });
};

main();
