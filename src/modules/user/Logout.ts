import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../context";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class LogoutResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: Context) {
    return `user id is: ${payload?.userId}`;
  }
}
