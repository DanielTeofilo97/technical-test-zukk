import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetricService {
    constructor(private prisma: PrismaService) {}

    async getFarmMetrics() {
        try {
            const totalFazendas = await this.prisma.producer.count();
            if (totalFazendas === 0) {
                throw new HttpException('Nenhuma metric encontrado', HttpStatus.NOT_FOUND);
            }

            const totalHectares = await this.prisma.producer.aggregate({
                _sum: {
                    areaTotalHectares: true,
                },
            });

            const farmsByState = await this.prisma.$queryRaw`
            SELECT
                estado AS state_name,
                COUNT(*)::INTEGER AS state_count
            FROM
                producer
            GROUP BY 
                estado
            `;

            const farmsByCulture = await this.prisma.$queryRaw`
            SELECT 
                c.nome AS culture_name,
                COUNT("pc"."idCulture")::INTEGER AS farm_count
            FROM 
                producer_culture pc
            JOIN 
                culture c ON "pc"."idCulture" = c.id
            GROUP BY 
                c.id, c.nome
            ORDER BY 
                farm_count DESC;
            `;

            const areaAgricultavel = await this.prisma.producer.aggregate({
                _sum: {
                    areaAgricultavelHectares: true,
                },
            });

            const areaVegetacao = await this.prisma.producer.aggregate({
                _sum: {
                    areaVegetacaoHectares: true,
                },
            });

            return {
                totalFazendas,
                totalHectares: totalHectares._sum.areaTotalHectares,
                usoSolo: {
                    areaAgricultavel: areaAgricultavel._sum.areaAgricultavelHectares,
                    areaVegetacao: areaVegetacao._sum.areaVegetacaoHectares,
                },
                farmsByState,
                farmsByCulture,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; 
            }
            throw new HttpException(
                'Erro ao buscar métricas',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
