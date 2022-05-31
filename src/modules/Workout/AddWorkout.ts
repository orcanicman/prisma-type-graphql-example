import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Workout } from "../../entities/Workout";
import { Context } from "../../helpers/context";
import { isAuth } from "../../middleware/isAuth";
import { AddWorkoutInput } from "./addWorkout/AddWorkoutInput";

@Resolver()
export class WorkoutResolver {
  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(
    @Arg("data") { date }: AddWorkoutInput,
    @Ctx() ctx: Context
  ) {
    // ): Promise<Workout> {
    //  TODO: fix type Workout

    const workout = await ctx.prismaContext.prisma.workout.create({
      data: { userId: ctx.payload!.userId, date },
      include: {
        user: true,
        exersizes: { include: { user: true, sets: true, workout: true } },
      },
    });

    return workout;
  }
}
