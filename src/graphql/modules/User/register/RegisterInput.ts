import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use!" })
  email: string;

  @Field()
  password: string;
}
