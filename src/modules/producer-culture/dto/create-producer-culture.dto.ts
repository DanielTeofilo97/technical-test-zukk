import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerCultureDTO {
  @ApiProperty({
    description: 'ID do produtor',
    example: 'a5e5c70e-9e56-4a4e-b418-6d6f663a4589',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'O ID do produtor é obrigatório' })
  idProducer: string;

  @ApiProperty({
    description: 'ID da cultura',
    example: 'b6f5c72d-9c12-4a8e-a7a3-8bce6794d2f8',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'O ID da cultura é obrigatório' })
  idCulture: string;

  @ApiProperty({
    description: 'ID do usuário que criou a cultura do produtor',
    example: 'c7g6h83d-9d23-4b9f-a8b3-9cfd890e3g4d',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  idUserCreate?: string;
}
