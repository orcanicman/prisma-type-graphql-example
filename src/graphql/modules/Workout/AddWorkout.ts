import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
import { Workout } from "../../entities/Workout";
import { Context } from "../../../helpers/context";
import { isAuth } from "../../../middleware/isAuth";
import { AddWorkoutInput } from "./addWorkout/AddWorkoutInput";

@Resolver(Workout)
export class WorkoutResolver {
  @FieldResolver()
  user(@Root() workout: Workout, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prismaContext.prisma.workout
      .findUnique({
        where: {
          id: workout.id,
        },
      })
      .user();
  }

  @Mutation((returns) => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(
    @Arg("data") { date }: AddWorkoutInput,
    @Ctx() ctx: Context
  ) {
    return ctx.prismaContext.prisma.workout.create({
      data: {
        date,
        user: {
          connect: {
            id: ctx.payload!.userId,
          },
        },
      },
    });
  }
}
