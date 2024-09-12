import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { MetricService } from './metric.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('metrics')
export class MetricController {
    private readonly logger: LoggerService
    constructor(
        private readonly metricService: MetricService,

    ) {
        this.logger = new LoggerService(MetricController.name)
    }

    @ApiOperation({ summary: 'Metrics' })
    @ApiResponse({ status: 200, description: 'Listagem Metrics' })
    @ApiResponse({
        status: 404,
        description: 'Nenhuma metric encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao buscar metrics',
    })
    @Get()
    @ApiTags('metrics')
    async read(
    ) {
        try {
            return await this.metricService.getFarmMetrics();
        } catch (error) {
            this.logger.error(error);
            throw new HttpException(
                'Erro ao buscar producers',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
