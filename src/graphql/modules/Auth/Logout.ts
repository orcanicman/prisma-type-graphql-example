import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../../helpers/context";
import { sendRefreshToken } from "../../../helpers/sendRefreshToken";
import { isAuth } from "../../../middleware/isAuth";

@Resolver()
export class LogoutResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  test(@Ctx() { payload }: Context) {
    return `user id is: ${payload!.userId}`;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }
}
