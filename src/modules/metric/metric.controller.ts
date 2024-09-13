import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricService } from './metric.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import * as metricExamples from './examples/metrics.example.json';

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
    @ApiResponse({
        status: 200, description: 'Listagem Metrics',
        content: {
            'application/json': {
                example: metricExamples['200']
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhuma metric encontrado',
        content: {
            'application/json': {
                example: metricExamples['404']
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao buscar metrics',
        content: {
            'application/json': {
                example: metricExamples['400']
            }
        }

    })
    @Get()
    @ApiTags('metrics')
    async read(
    ) {
        return await this.metricService.getFarmMetrics();
    }
}
