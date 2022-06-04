import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../../../helpers/context";
import { isAuth } from "../../../middleware/isAuth";
import { Profile } from "../../entities/Profile";
import { User } from "../../entities/User";
import { Workout } from "../../entities/Workout";
@Resolver(User)
export class UserResolver {
  @FieldResolver()
  profile(@Root() user: User, @Ctx() ctx: Context): Promise<Profile | null> {
    return ctx.prismaContext.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .profile();
  }

  @FieldResolver()
  workouts(@Root() user: User, @Ctx() ctx: Context): Promise<Workout[]> {
    return ctx.prismaContext.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .workouts();
  }

  @Query((returns) => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context) {
    return ctx.prismaContext.prisma.user.findUnique({
      where: { id: ctx.payload?.userId },
    });
  }
}
