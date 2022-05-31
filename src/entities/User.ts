import { Field, ID, ObjectType } from "type-graphql";
import { Profile } from "./Profile";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  password: string;

  @Field((type) => Profile)
  profile?: Profile;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
