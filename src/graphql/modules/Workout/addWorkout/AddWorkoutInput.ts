import { Field, InputType } from "type-graphql";

@InputType()
export class AddWorkoutInput {
  @Field((type) => Date)
  date: Date;
}
