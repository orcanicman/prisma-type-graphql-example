import { Workout } from "@prisma/client";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Context } from "../../../helpers/context";
import { Exersize } from "../../entities/Exersize";
import { Set } from "../../entities/Set";
import { User } from "../../entities/User";

@Resolver(Exersize)
export class ExersizeResolver {
  @FieldResolver()
  user(@Root() exersize: Exersize, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prismaContext.prisma.exersize
      .findUnique({
        where: {
          id: exersize.id,
        },
      })
      .user();
  }

  @FieldResolver()
  workouts(
    @Root() exersize: Exersize,
    @Ctx() ctx: Context
  ): Promise<Workout[] | null> {
    return ctx.prismaContext.prisma.exersize
      .findUnique({
        where: {
          id: exersize.id,
        },
      })
      .workouts();
  }

  @FieldResolver()
  sets(@Root() exersize: Exersize, @Ctx() ctx: Context): Promise<Set[] | null> {
    return ctx.prismaContext.prisma.exersize
      .findUnique({
        where: {
          id: exersize.id,
        },
      })
      .sets();
  }
}
