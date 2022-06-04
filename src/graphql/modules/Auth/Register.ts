import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../helpers/context";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, password }: RegisterInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);

    const user = await ctx.prismaContext.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return user;
  }
}
