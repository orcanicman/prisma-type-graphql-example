import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { prismaContext } from "./helpers/context";
import { RegisterResolver } from "./modules/User/Register";
import { LoginResolver } from "./modules/User/Login";
import { LogoutResolver } from "./modules/User/Logout";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessToken } from "./helpers/createTokens";
import { WorkoutResolver } from "./modules/Workout/AddWorkout";

const main = async () => {
  const app = express();
  app.use(cookieParser());

  app.post("/refresh_token", async (req, res) => {
    try {
      const token = req.cookies.jid;
      if (!token) {
        return res.send({ accessToken: "" });
      }

      let payload: any = null;
      try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      } catch (err) {
        console.log(err);
        res.send({ accessToken: "" });
      }

      // valid token, send back accesstoken
      const user = await prismaContext.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        return res.send({ accessToken: "" });
      } else {
        return res.send({ accessToken: createAccessToken(user) });
      }
    } catch (error) {}
  });

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
