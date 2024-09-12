import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCultureDTO {
    @ApiProperty({
        description: 'Nome da cultura',
        example: 'Arroz',
        required: true,
      })
      @IsString()
      @IsNotEmpty({ message: 'Nome da cultura é obrigatório' })
      nome: string;

      @ApiProperty({
        description: 'ID do usuário que criou o produtor',
        example: 'a5e5c70e-9e56-4a4e-b418-6d6f663a4589',
        required: false,
      })
      @IsString({ message: 'O ID do usuário criador deve ser uma cadeia de caracteres' })
      @IsOptional()
      idUserCreate?: string;

}