import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { CreateProducerDTO } from './dto/create-producer.dto';

@Injectable()
export class ProducerService {
    private readonly logger: LoggerService

    constructor(private readonly prisma: PrismaService) {
        this.logger = new LoggerService(ProducerService.name)
    }

    async create(producer: CreateProducerDTO, user_id: string) {
        producer.idUserCreate = user_id;
        producer.idUserUpdate = user_id;

        try {
            const producerExists = await this.prisma.producer.findFirst({
                where: {
                    cpfCnpj: producer.cpfCnpj
                }
            })
            if (!producerExists) {
                return this.prisma.producer.create({
                    data: producer
                });
            } else {
                throw new ConflictException('Producer with CPF/CNPJ already exists');
            }
        } catch (error) {
            throw new BadRequestException(error);
        }

    }
    async list({
        skip = 0,
        take = 10,
        filter = {},
        orderBy = { createdAt: 'desc' },
    }: {
        skip?: number;
        take?: number;
        filter?: {
            cpfCnpj?: string;
            nomeProdutor?: string;
            nomeFazenda?: string;
            cidade?: string;
            estado?: string;
        };
        orderBy?: any;
    }) {

        const dynamicFilter: any = {};

        if (filter.cpfCnpj) {
            dynamicFilter.cpfCnpj = { contains: filter.cpfCnpj, mode: 'insensitive' };
        }
        if (filter.nomeProdutor) {
            dynamicFilter.nomeProdutor = { contains: filter.nomeProdutor, mode: 'insensitive' };
        }
        if (filter.nomeFazenda) {
            dynamicFilter.nomeFazenda = { contains: filter.nomeFazenda, mode: 'insensitive' };
        }
        if (filter.cidade) {
            dynamicFilter.cidade = { contains: filter.cidade, mode: 'insensitive' };
        }
        if (filter.nomeFazenda) {
            dynamicFilter.estado = { contains: filter.estado, mode: 'insensitive' };
        }

        const totalCount = await this.prisma.producer.count({
            where: dynamicFilter,
        });

        const vehicles = await this.prisma.producer.findMany({
            skip,
            take,
            where: dynamicFilter,
            orderBy,
            select: {
                id: true,
                cpfCnpj: true,
                nomeProdutor: true,
                nomeFazenda: true,
                cidade: true,
                estado: true,
                areaTotalHectares:true,
                areaVegetacaoHectares:true,
                areaAgricultavelHectares:true,
                createdAt: true,
                updatedAt: true,
                createdBy: {
                    select: {
                        name: true,
                    },
                },
                updatedBy: {
                    select: {
                        name: true,
                    },
                },
            },
        });


        const hasNextPage = skip + take < totalCount;

        return {
            totalCount,
            hasNextPage,
            vehicles,
        };
    }


    async delete(id: string) {
        try {
            await this.prisma.producer.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
