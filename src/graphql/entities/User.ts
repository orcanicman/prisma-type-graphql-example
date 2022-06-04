import { Field, ID, ObjectType } from "type-graphql";
import { Exersize } from "./Exersize";
import { Profile } from "./Profile";
import { Workout } from "./Workout";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  password: string;

  @Field((type) => Profile, { nullable: true })
  profile?: Profile | null;

  @Field((type) => [Workout], { nullable: true })
  workouts?: [Workout] | null;

  @Field((type) => [Exersize], { nullable: true })
  savedExersizes?: [Exersize] | null;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
