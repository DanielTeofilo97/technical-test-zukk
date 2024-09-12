import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LoggerModule } from 'src/utils/logger/logger.module';

@Module({
  imports:[forwardRef(() => LoggerModule)],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
