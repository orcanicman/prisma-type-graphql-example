import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field()
  weight: number;

  @Field()
  height: number;

  @Field((type) => Date)
  birtdate: Date;
}
