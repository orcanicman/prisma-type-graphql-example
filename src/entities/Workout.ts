import { Field, ID, ObjectType } from "type-graphql";
import { Exersize } from "./Exersize";
import { User } from "./User";

@ObjectType()
export class Workout {
  @Field((type) => ID)
  id: string;

  @Field()
  user: User;

  @Field((type) => [Exersize], { complexity: 2 })
  exersizes: Exersize[];

  @Field((type) => Date)
  date: Date;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
