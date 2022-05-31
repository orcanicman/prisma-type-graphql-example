import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Set } from "./Set";
import { Workout } from "./Workout";

@ObjectType()
export class Exersize {
  @Field((type) => ID)
  id: string;

  @Field((type) => User)
  user: User;

  @Field((type) => [Workout])
  workout: Workout[];

  @Field()
  name: string;

  @Field((type) => [Set])
  sets: Set[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
