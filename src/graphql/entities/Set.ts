import { Field, ID, ObjectType } from "type-graphql";
import { Exersize } from "./Exersize";
import { User } from "./User";

@ObjectType()
export class Set {
  @Field((type) => ID)
  id: string;

  @Field((type) => [User])
  user: User;

  @Field((type) => Exersize)
  exersize: Exersize;

  @Field()
  reps: number;

  @Field()
  weight: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
