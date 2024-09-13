import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CultureService } from './culture.service';
import { LoggerService } from '../../utils/logger/logger.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCultureDTO } from './dto/create-culture.dto';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import * as cultureCreateExamples from './examples/culture-create.example.json';
import * as culturelistExamples from './examples/culture-list.example.json';
import * as cultureDeleteExamples from './examples/culture-delete.example.json';

@ApiBearerAuth()
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('cultures')
export class CultureController {

    private readonly logger: LoggerService
    constructor(
        private readonly cultureService: CultureService,

    ) {
        this.logger = new LoggerService(CultureController.name);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    @ApiOperation({ summary: 'Criar Cultura' })
    @ApiResponse({
        status: 201,
        description: 'Cultura criada',
        content: {
            'application/json': {
                example: cultureCreateExamples['201']
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Erro durante a criação da cultura',
        content: {
            'application/json': {
                example: cultureCreateExamples['400']
            }
        }
    })
    @ApiResponse({
        status: 409,
        description: 'Culture com esse nome já existe',
        content: {
            'application/json': {
                example: cultureCreateExamples['409']
            }
        }
    })
    @ApiResponse({
        status: 403,
        description: 'Usuario não tem acesso ao recurso',
        content: {
            'application/json': {
                example: cultureCreateExamples['403']
            }
        }
    })
    @ApiTags('cultures')
    async create(@Body() data: CreateCultureDTO, @Req() req) {
        return this.cultureService.create(data, req.user.id);
    }



    @ApiOperation({ summary: 'Listagem Culturas' })
    @ApiResponse({
        status: 200,
        description: 'Listagem  Culturas',
        content: {
            'application/json': {
                example: culturelistExamples['200']
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhuma cultura encontrado',
        content: {
            'application/json': {
                example: culturelistExamples['404']
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao buscar culturas',
        content: {
            'application/json': {
                example: culturelistExamples['400']
            }
        }
    })
    @ApiQuery({ name: 'skip', required: false, description: 'Quantidade de registros para pular', example: 0 })
    @ApiQuery({ name: 'take', required: false, description: 'Quantidade de registros para pegar', example: 20 })
    @ApiQuery({ name: 'nome', required: false, description: 'Nome da Cultura', example: 'Arroz' })
    @Get()
    @ApiTags('cultures')
    async read(
        @Query('skip') skip: string = '0',
        @Query('take') take: string = '20',
        @Query('nome') nome?: string,
    ) {
        try {
            const skipNumber = parseInt(skip, 10);
            const takeNumber = parseInt(take, 10);

            const filter = {
                ...(nome ? { nome } : {}),
            };

            return await this.cultureService.list({
                skip: skipNumber,
                take: takeNumber,
                filter,
                orderBy: { createdAt: 'desc' },
            });
        } catch (error) {
            this.logger.error(error);
            throw new HttpException(
                'Erro ao buscar culturas',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiOperation({ summary: 'Desabilitar Cultura' })
    @ApiResponse({
        status: 200, description: 'Cultura desabilitado.'
    })
    @ApiResponse({
        status: 404, description: 'Cultura não encontrada.',
        content: {
            'application/json': {
                example: cultureDeleteExamples['404']
            }
        }
    })
    @ApiResponse({
        status: 403,
        description: 'Usuario não tem acesso ao recurso',
        content: {
            'application/json': {
                example: cultureDeleteExamples['403']
            }
        }
    })
    @ApiTags('cultures')
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.cultureService.delete(id);
    }
}
