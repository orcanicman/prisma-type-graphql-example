import { Field, ID, ObjectType } from "type-graphql";
import { Exersize } from "./Exersize";
import { User } from "./User";

@ObjectType()
export class Workout {
  @Field((type) => ID)
  id: string;

  @Field((type) => User)
  user: User;

  @Field((type) => [Exersize], { nullable: true })
  exersizes?: Exersize[] | null;

  @Field((type) => Date)
  date: Date;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
