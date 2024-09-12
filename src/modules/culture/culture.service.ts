import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { CreateCultureDTO } from './dto/create-culture.dto';

@Injectable()
export class CultureService {
    private readonly logger: LoggerService

    constructor(private readonly prisma: PrismaService) {
        this.logger = new LoggerService(CultureService.name)
    }

    async create(culture: CreateCultureDTO, user_id: string) {
        culture.idUserCreate = user_id;
        try {
            const cultureExists = await this.prisma.culture.findFirst({
                where: {
                    nome: culture.nome,
                    active: true
                }
            })
            if (!cultureExists) {
                return this.prisma.culture.create({
                    data: culture
                });
            } else {
                throw new ConflictException('Culture with nome already exists');
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
            nome?: string;
        };
        orderBy?: any;
    }) {

        const dynamicFilter: any = {};

        if (filter.nome) {
            dynamicFilter.nome = { contains: filter.nome, mode: 'insensitive' };
        }

        dynamicFilter.active = { equals: true };
        
        const totalCount = await this.prisma.culture.count({
            where: dynamicFilter,
        });

        const vehicles = await this.prisma.culture.findMany({
            skip,
            take,
            where: dynamicFilter,
            orderBy,
            select: {
                id: true,
                nome: true,
                active: true,
                createdBy: {
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
            await this.prisma.culture.update({
                where: { id }, data: {
                    active: false
                }
            });
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
