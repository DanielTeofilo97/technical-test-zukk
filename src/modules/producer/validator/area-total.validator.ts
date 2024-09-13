import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidAreaTotal', async: false })
export class IsValidAreaTotal implements ValidatorConstraintInterface {
  validate(areaTotal: number, args: ValidationArguments) {
    const { areaAgricultavelHectares, areaVegetacaoHectares } = args.object as any;
    const somaAreas = areaAgricultavelHectares + areaVegetacaoHectares;
    return areaTotal >= somaAreas && areaTotal <= somaAreas; 
  }

  defaultMessage(args: ValidationArguments) {
    const { areaAgricultavelHectares, areaVegetacaoHectares } = args.object as any;
    const somaAreas = areaAgricultavelHectares + areaVegetacaoHectares;

    if (args.value < somaAreas) {
      return `A área total (${args.value} hectares) não pode ser menor que a soma das áreas agricultável e vegetação (${somaAreas} hectares).`;
    } else if (args.value > somaAreas) {
      return `A área total (${args.value} hectares) não pode ser maior que a soma das áreas agricultável e vegetação (${somaAreas} hectares).`;
    }
    return 'A área total está incorreta.';
  }
}
