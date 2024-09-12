import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: LoggerService

  constructor(

  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    this.logger = new LoggerService(PrismaService.name)
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e: EventDTO) => {
      this.logger.debug('Query: ' + e.query);
      this.logger.debug('Params: ' + e.params);
      this.logger.debug('Duration: ' + e.duration + 'ms');
    });
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
