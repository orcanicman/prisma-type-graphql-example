import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { prismaContext } from "./helpers/context";
import { RegisterResolver } from "./graphql/modules/User/Register";
import { LoginResolver } from "./graphql/modules/User/Login";
import { LogoutResolver } from "./graphql/modules/User/Logout";
import cookieParser from "cookie-parser";
import { WorkoutResolver } from "./graphql/modules/Workout/AddWorkout";
import { RefreshToken } from "./express/RefreshToken";

const main = async () => {
  const app = express();
  app.use(cookieParser());

  app.post("/refresh_token", RefreshToken);

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      WorkoutResolver,
    ],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: (req: Request, res: Response) => ({
      ...req,
      ...res,
      prismaContext,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Apollo server started on http://localhost:4000/graphql")
  );
};

main();
