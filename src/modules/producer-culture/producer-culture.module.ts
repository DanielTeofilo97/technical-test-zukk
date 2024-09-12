import { forwardRef, Module } from '@nestjs/common';
import { ProducerCultureService } from './producer-culture.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    PrismaModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule), 
  ],
  providers: [ProducerCultureService]
})
export class ProducerCultureModule {}
