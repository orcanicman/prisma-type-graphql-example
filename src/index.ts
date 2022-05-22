import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { prismaContext } from "./context";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { LogoutResolver } from "./modules/user/Logout";

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, LogoutResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: (req: Request, res: Response) => ({
      // i dont know why i have to destructure these, find out why later
      ...req,
      ...res,
      prismaContext,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("server started on http://localhost:4000/graphql")
  );
};

main();
