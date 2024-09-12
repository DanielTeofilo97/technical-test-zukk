import { forwardRef, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerModule } from 'src/utils/logger/logger.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProducerCultureModule } from '../producer-culture/producer-culture.module';

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule), 
    forwardRef(() => LoggerModule), 
    forwardRef(() => ProducerCultureModule)
  ],
  providers: [ProducerService],
  controllers: [ProducerController]
})
export class ProducerModule { }
