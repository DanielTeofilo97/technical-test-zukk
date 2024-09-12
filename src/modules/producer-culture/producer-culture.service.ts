import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { ProducerService } from '../producer/producer.service';
import { CreateProducerCultureDTO } from './dto/create-producer-culture.dto';

@Injectable()
export class ProducerCultureService {
    private readonly logger: LoggerService

    constructor(private readonly prisma: PrismaService) {
        this.logger = new LoggerService(ProducerService.name)
    }

    async create(producerCulture: CreateProducerCultureDTO, user_id: string) {
        producerCulture.idUserCreate = user_id;
        return this.prisma.producerCulture.create({
            data: producerCulture
        });
    }


    async delete(id: string) {
        try {
            await this.prisma.producerCulture.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
