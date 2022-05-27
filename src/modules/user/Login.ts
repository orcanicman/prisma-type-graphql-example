import argon2 from "argon2";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { createAccessToken } from "../../createTokens";
import { Context } from "../../context";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<LoginResponse> {
    const user = await ctx.prismaContext.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      throw new Error("incorrect password");
    }
    // user logged in
    ctx.res.cookie("jid", createAccessToken(user));

    return { accessToken: createAccessToken(user) };
  }
}
