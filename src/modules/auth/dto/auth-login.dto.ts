import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class AuthLoginDTO {
  @ApiProperty()
  @IsCPF({
    message: 'CPF inválido!',
  })
  cpf: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter mais ou igual a 8 caracteres' })
  password: string;
}
