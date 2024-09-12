import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { CreateProducerDTO } from './dto/create-producer.dto';
import { UpdateProducerDTO } from './dto/update-producer.dto';

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
                    cpfCnpj: producer.cpfCnpj,
                },
            });

            if (producerExists) {
                throw new ConflictException('Producer with CPF/CNPJ already exists');
            }

            if (producer.cultures && producer.cultures.length > 0) {
                const cultureIds = producer.cultures.map(culture => culture.idCulture);

                const existingCultures = await this.prisma.culture.findMany({
                    where: {
                        id: { in: cultureIds },
                    },
                    select: { id: true },
                });

                if (existingCultures.length !== cultureIds.length) {
                    const invalidIds = cultureIds.filter(
                        id => !existingCultures.some(culture => culture.id === id)
                    );
                    throw new NotFoundException(`Cultures not found with IDs: ${invalidIds.join(', ')}`);
                }
            }

            const { cultures, ...producerData } = producer;

            const newProducer = await this.prisma.producer.create({
                data: producerData,
            });

            if (cultures && cultures.length > 0) {
                const producerCulturesData = cultures.map(culture => ({
                    idProducer: newProducer.id,
                    idCulture: culture.idCulture,
                    idUserCreate: user_id,
                }));

                await this.prisma.producerCulture.createMany({
                    data: producerCulturesData,
                });
            }

            return newProducer;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async update(id: string, producer: UpdateProducerDTO, user_id: string) {
        producer.idUserUpdate = user_id;

        try {
  
            /**
              * Verificar se o produtor existe
             */
            const existingProducer = await this.prisma.producer.findUnique({
                where: { id },
            });

            if (!existingProducer) {
                throw new NotFoundException(`Producer not found with ID: ${id}`);
            }


            /**
              * Verificar se as culturas associadas existem
             */
            if (producer.cultures && producer.cultures.length > 0) {
                const cultureIds = producer.cultures.map(culture => culture.idCulture);

                const existingCultures = await this.prisma.culture.findMany({
                    where: {
                        id: { in: cultureIds },
                    },
                    select: { id: true },
                });

                if (existingCultures.length !== cultureIds.length) {
                    const invalidIds = cultureIds.filter(
                        id => !existingCultures.some(culture => culture.id === id)
                    );
                    throw new NotFoundException(`Cultures not found with IDs: ${invalidIds.join(', ')}`);
                }
            }

            const { cultures, ...producerData } = producer;

            /**
              *  Atualizar dados do produtor
             */
            const updatedProducer = await this.prisma.producer.update({
                where: { id },
                data: producerData,
            });

            
            /**
              *   Recuperar culturas atuais associadas ao produtor
            */
            const currentCultures = await this.prisma.producerCulture.findMany({
                where: { idProducer: id },
                select: { idCulture: true },
            });

            const currentCultureIds = currentCultures.map(c => c.idCulture);

            
            /**
              *   Culturas a serem adicionadas (presentes na lista nova, mas não nas culturas atuais)
            */
            const culturesToAdd = cultures.filter(culture => !currentCultureIds.includes(culture.idCulture));
 
            /**
              *   Culturas a serem removidas (presentes nas culturas atuais, mas não na lista nova)
            */
            const culturesToRemove = currentCultureIds.filter(idCulture =>
                !cultures.some(culture => culture.idCulture === idCulture)
            );

            /**
              *   Adicionar novas culturas
            */
            if (culturesToAdd.length > 0) {
                const producerCulturesData = culturesToAdd.map(culture => ({
                    idProducer: id,
                    idCulture: culture.idCulture,
                    idUserCreate: user_id,
                }));

                await this.prisma.producerCulture.createMany({
                    data: producerCulturesData,
                });
            }
 
            /**
              *   Remover culturas antigas
            */
            if (culturesToRemove.length > 0) {
                await this.prisma.producerCulture.deleteMany({
                    where: {
                        idProducer: id,
                        idCulture: { in: culturesToRemove },
                    },
                });
            }

            return updatedProducer;

        } catch (error) {
            throw new BadRequestException(error.message);
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
        if (filter.estado) {
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
                areaTotalHectares: true,
                areaVegetacaoHectares: true,
                areaAgricultavelHectares: true,
                createdAt: true,
                updatedAt: true,
                cultures: {
                    select: {
                        culture: {
                            select: {
                                id: true,
                                nome: true,
                            },
                        },
                    },
                },
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
