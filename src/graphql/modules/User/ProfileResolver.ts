import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../../../helpers/context";
import { isAuth } from "../../../middleware/isAuth";
import { Profile } from "../../entities/Profile";
import { User } from "../../entities/User";
import { CreateProfileInput } from "./profile/CreateProfileInput";

@Resolver(Profile)
export class ProfileResolver {
  @FieldResolver()
  user(@Root() profile: Profile, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prismaContext.prisma.profile
      .findUnique({
        where: {
          id: profile.id,
        },
      })
      .user();
  }

  @Mutation((returns) => Profile)
  @UseMiddleware(isAuth)
  async createProfile(
    @Arg("data") { name, height, weight, birtdate }: CreateProfileInput,
    @Ctx() ctx: Context
  ) {
    return ctx.prismaContext.prisma.profile.create({
      data: {
        name,
        height,
        weight,
        birtdate,
        user: {
          connect: {
            id: ctx.payload!.userId,
          },
        },
      },
    });
  }
}
