import { IsString, IsNotEmpty, Matches, Validate, IsOptional, IsNumber } from 'class-validator';
import { IsValidCpfCnpj } from '../validator/cpf-cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDTO {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '12345678901',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'CPF ou CNPJ é obrigatório' })
  @Matches(/^\d+$/, { message: 'CPF ou CNPJ deve conter apenas dígitos' })
  @Validate(IsValidCpfCnpj, { message: 'CPF ou CNPJ inválido' })  
  cpfCnpj: string;

  @ApiProperty({
    description: 'Nome do produtor',
    example: 'João da Silva',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome do produtor é obrigatório' })
  nomeProdutor: string;

  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Vista',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome da fazenda é obrigatório' })
  nomeFazenda: string;

  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    example: 'São Paulo',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  cidade: string;

  @ApiProperty({
    description: 'Estado onde a fazenda está localizada',
    example: 'SP',
    required: true,
  })
  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'Estado deve ser a sigla de 2 letras' })
  estado: string;

  @ApiProperty({
    description: 'Área total em hectares da fazenda',
    example: 1000,
    required: true,
  })
  @IsNumber({}, { message: 'Área total deve ser um número' })
  @IsNotEmpty({ message: 'Área total em hectares é obrigatória' })
  areaTotalHectares: number;

  @ApiProperty({
    description: 'Área agricultável em hectares da fazenda',
    example: 800,
    required: true,
  })
  @IsNumber({}, { message: 'Área agricultável deve ser um número' })
  @IsNotEmpty({ message: 'Área agricultável em hectares é obrigatória' })
  areaAgricultavelHectares: number;

  @ApiProperty({
    description: 'Área de vegetação em hectares da fazenda',
    example: 200,
    required: true,
  })
  @IsNumber({}, { message: 'Área de vegetação deve ser um número' })
  @IsNotEmpty({ message: 'Área de vegetação em hectares é obrigatória' })
  areaVegetacaoHectares: number;

  @ApiProperty({
    description: 'ID do usuário que criou o produtor',
    example: 'a5e5c70e-9e56-4a4e-b418-6d6f663a4589',
    required: false,
  })
  @IsString({ message: 'O ID do usuário criador deve ser uma cadeia de caracteres' })
  @IsOptional()
  idUserCreate?: string;

  @ApiProperty({
    description: 'ID do usuário que atualizou o produtor',
    example: 'd60e77ab-4a6d-4e7c-b1e1-9f2d907d2f8d',
    required: false,
  })
  @IsString({ message: 'O ID do usuário atualizador deve ser uma cadeia de caracteres' })
  @IsOptional()
  idUserUpdate?: string;
}
