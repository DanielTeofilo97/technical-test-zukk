import { forwardRef, Module } from '@nestjs/common';
import { CultureService } from './culture.service';
import { CultureController } from './culture.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerModule } from 'src/utils/logger/logger.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule, 
    LoggerModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule)
  ],
  providers: [CultureService],
  controllers: [CultureController],
  exports: [CultureService],
})
export class CultureModule { }
