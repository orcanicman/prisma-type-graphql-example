import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  id: string;

  @Field((type) => User)
  user: User;

  @Field()
  name: string;

  @Field()
  weight: number;

  @Field()
  height: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
