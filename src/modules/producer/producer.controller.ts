import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';
import { ProducerService } from './producer.service';
import { CreateProducerDTO } from './dto/create-producer.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { UpdateProducerDTO } from './dto/update-producer.dto';
import * as producerCreateExamples from './examples/producer-create.example.json';
import * as producerListExamples from './examples/producer-list.example.json';
import * as producerUpdateExamples from './examples/producer-update.example.json';
import * as producerDeleteExamples from './examples/producer-delete.example.json';

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('producers')
export class ProducerController {
  private readonly logger: LoggerService
  constructor(
    private readonly producerService: ProducerService,

  ) {
    this.logger = new LoggerService(ProducerController.name)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Criar Produtor' })
  @ApiResponse({
    status: 201, description: 'Produtor criado',
    content: {
      'application/json': {
        example: producerCreateExamples['201']
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro durante a criação do produtor',
    content: {
      'application/json': {
        example: producerCreateExamples['400']
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Produtor já cadastrado',
    content: {
      'application/json': {
        example: producerCreateExamples['409']
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario não tem acesso ao recurso',
    content: {
      'application/json': {
        example: producerCreateExamples['403']
      }
    }
  })
  @ApiTags('producers')
  async create(@Body() data: CreateProducerDTO, @Req() req) {
    return this.producerService.create(data, req.user.id);
  }

  @ApiOperation({ summary: 'Listagem Producers' })
  @ApiResponse({
    status: 200, description: 'Listagem Producers',
    content: {
      'application/json': {
        example: producerListExamples['200']
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum producer encontrado',
    content: {
      'application/json': {
        example: producerListExamples['404']
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar producers',
    content: {
      'application/json': {
        example: producerListExamples['400']
      }
    }
  })
  @ApiQuery({ name: 'skip', required: false, description: 'Quantidade de registros para pular', example: 0 })
  @ApiQuery({ name: 'take', required: false, description: 'Quantidade de registros para pegar', example: 20 })
  @ApiQuery({ name: 'cpfCnpj', required: false, description: 'CPF/CNPJ do produtor', example: '83124955000188' })
  @ApiQuery({ name: 'nomeProdutor', required: false, description: 'Nome do produtor', example: 'João' })
  @ApiQuery({ name: 'nomeFazenda', required: false, description: 'Nome da Fazenda', example: 'Fazenda das Gerais' })
  @ApiQuery({ name: 'cidade', required: false, description: 'Nome da cidade', example: 'São Paulo' })
  @ApiQuery({ name: 'estado', required: false, description: 'Sigla do estado', example: 'SP' })
  @Get()
  @ApiTags('producers')
  async read(
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
    @Query('cpfCnpj') cpfCnpj?: string,
    @Query('nomeProdutor') nomeProdutor?: string,
    @Query('nomeFazenda') nomeFazenda?: string,
    @Query('cidade') cidade?: string,
    @Query('estado') estado?: string,
  ) {
    try {
      const skipNumber = parseInt(skip, 10);
      const takeNumber = parseInt(take, 10);

      const filter = {
        ...(cpfCnpj ? { cpfCnpj } : {}),
        ...(nomeProdutor ? { nomeProdutor } : {}),
        ...(nomeFazenda ? { nomeFazenda } : {}),
        ...(cidade ? { cidade } : {}),
        ...(estado ? { estado } : {}),
      };

      return await this.producerService.list({
        skip: skipNumber,
        take: takeNumber,
        filter,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Erro ao buscar producers',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Atualizar Produtor pelo id' })
  @ApiResponse({
    status: 200, description: 'Produtor atualizado.', content: {
      'application/json': {
        example: producerUpdateExamples['200']
      }
    }
  })
  @ApiResponse({
    status: 400, description: 'Erro ao atualizar produtor.',
    content: {
      'application/json': {
        example: producerUpdateExamples['400']
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Produtor não encontrado.', content: {
      'application/json': {
        example: producerUpdateExamples['404']
      }
    }
  })
  @ApiTags('producers')
  @Put(':id')
  async update(
    @Body() data: UpdateProducerDTO,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req
  ) {
    return this.producerService.update(id, data, req.user.id);
  }


  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Desabilitar Produtor' })
  @ApiResponse({ status: 200, description: 'Produtor desabilitado.' })
  @ApiResponse({
    status: 404, description: 'Produtor não encontrado.',
    content: {
      'application/json': {
        example: producerDeleteExamples['404']
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario não tem acesso ao recurso',
    content: {
      'application/json': {
        example: producerDeleteExamples['403']
      }
    }
  })
  @ApiTags('producers')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.producerService.delete(id);
  }
}
