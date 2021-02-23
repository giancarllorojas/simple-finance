import { authorizeAuthChecker, decodeToken } from './utils/auth';
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { TransactionResolver } from './resolvers/TransactionResolver';
import cors from 'cors'

(async () => {
  const app = express();

  app.use( cors() );

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TransactionResolver],
      validate: true,
      authChecker: authorizeAuthChecker
    }),
    context: async ({ req, res }) => {
      const token = req.headers.authorization || '';

      if(token){
        try{
          const userData = await decodeToken(token)

          return {req, res, user: userData}
        }catch(e){

        }
      }

      return {req, res}
    }
  });

  apolloServer.applyMiddleware({ app, cors: true });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
