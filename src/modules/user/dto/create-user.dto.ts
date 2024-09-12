import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  @ApiProperty()
  @IsString({
    message: 'name deve ser uma cadeia de caracteres',
  })
  name: string;

  @ApiProperty()
  @IsCPF({
    message: 'CPF inválido!',
  })
  @Matches(/^\d{11}$/, {
    message: 'O CPF deve conter exatamente 11 dígitos sem máscara (somente números).',
  })
  cpf: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter mais ou igual a 8 caracteres' })
  password: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsEnum(Role, { message: 'O valor fornecido para o campo role é inválido.' })
  role: number;
}
