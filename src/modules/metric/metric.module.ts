import { forwardRef, Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[PrismaModule,forwardRef(() => AuthModule),forwardRef(() => UserModule)],
  providers: [MetricService],
  controllers: [MetricController]
})
export class MetricModule {}
