import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'class-validator-cpf';

export class AuthForgetDTO {
  @ApiProperty()
  @IsCPF()
  cpf: string;
}
