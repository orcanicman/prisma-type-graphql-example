import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { prismaContext } from "../../../../helpers/context";

@ValidatorConstraint({ async: true })
export class IsProfileAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(userId: string, args: ValidationArguments) {
    return prismaContext.prisma.user
      .findUnique({ where: { id: userId } })
      .profile()
      .then((profile) => {
        if (profile) return false;
        return true;
      });
  }
}

export function IsProfileAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProfileAlreadyExistConstraint,
    });
  };
}
