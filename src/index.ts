import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { prismaContext } from "./helpers/context";
import { RegisterResolver } from "./graphql/modules/Auth/Register";
import { LoginResolver } from "./graphql/modules/Auth/Login";
import { LogoutResolver } from "./graphql/modules/Auth/Logout";
import cookieParser from "cookie-parser";
import { WorkoutResolver } from "./graphql/modules/Workout/WorkoutResolver";
import { RefreshToken } from "./express/RefreshToken";
import { UserResolver } from "./graphql/modules/User/UserResolver";
import { ProfileResolver } from "./graphql/modules/User/ProfileResolver";
import { ExersizeResolver } from "./graphql/modules/Excersizes/ExersizeResolver";

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
      UserResolver,
      ProfileResolver,
      ExersizeResolver,
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
