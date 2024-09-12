import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';
import { ProducerService } from './producer.service';
import { CreateProducerDTO } from './dto/create-producer.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('producer')
export class ProducerController {
    private readonly logger: LoggerService
    constructor(
      private readonly producerService: ProducerService,
      
    ) {
        this.logger =  new LoggerService(ProducerController.name)
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    @ApiOperation({ summary: 'Criar Produtor' })
    @ApiResponse({ status: 201, description: 'Produtor criado' })
    @ApiResponse({
      status: 400,
      description: 'Erro durante a criação do produtor',
    })
    @ApiResponse({
        status: 409,
        description: 'Produtor já cadastrado',
      })
    @ApiResponse({
      status: 403,
      description: 'Usuario não tem acesso ao recurso',
    })
    @ApiTags('producers')
    async create(@Body() data: CreateProducerDTO, @Req() req) {
      return this.producerService.create(data, req.user.id);
    }

    @ApiOperation({ summary: 'Listagem Veículos' })
    @ApiResponse({ status: 200, description: 'Listagem Veículos' })
    @ApiResponse({
      status: 404,
      description: 'Nenhum veículo encontrado',
    })
    @ApiResponse({
      status: 400,
      description: 'Erro ao buscar veículos',
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
          'Erro ao buscar veículos',
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiOperation({ summary: 'Desabilitar Produtor' })
    @ApiResponse({ status: 200, description: 'Produtor desabilitado.' })
    @ApiResponse({ status: 404, description: 'Produtor não encontrado.' })
    @ApiResponse({
      status: 403,
      description: 'Usuario não tem acesso ao recurso',
    })
    @ApiTags('producers')
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
      return this.producerService.delete(id);
    }
}
