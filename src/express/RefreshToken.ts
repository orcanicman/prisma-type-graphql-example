import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaContext } from "../helpers/context";
import { createAccessToken } from "../helpers/createTokens";

const RefreshToken = async (request: Request, response: Response) => {
  try {
    const token = request.cookies.jid;
    if (!token) {
      return response.send({ accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      response.send({ accessToken: "" });
    }

    // valid token, send back accesstoken
    const user = await prismaContext.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return response.send({ accessToken: "" });
    } else {
      return response.send({ accessToken: createAccessToken(user) });
    }
  } catch (error) {}
};

export { RefreshToken };
