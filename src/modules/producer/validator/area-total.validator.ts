import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidAreaTotal', async: false })
export class IsValidAreaTotal implements ValidatorConstraintInterface {
  validate(areaTotal: number, args: ValidationArguments) {
    const { areaAgricultavelHectares, areaVegetacaoHectares } = args.object as any;
    return areaTotal >= areaAgricultavelHectares + areaVegetacaoHectares;
  }

  defaultMessage() {
    return 'A soma da área agricultável e vegetação não pode ser maior que a área total.';
  }
}
