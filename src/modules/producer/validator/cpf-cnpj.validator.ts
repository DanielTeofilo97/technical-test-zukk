import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isCPF, isCNPJ } from 'validation-br'

@ValidatorConstraint({ name: 'isValidCpfCnpj', async: false })
export class IsValidCpfCnpj implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value || (value.length !== 11 && value.length !== 14)) {
      return false;
    }

    if (value.length === 11) {
      return isCPF(value);
    } else if (value.length === 14) {
      return isCNPJ(value);
    }

    return false;
  }
}
