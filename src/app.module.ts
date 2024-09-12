import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { LoggerModule } from './utils/logger/logger.module';
import { PostmanModule } from './modules/postman/postman.module';
import { ProducerModule } from './modules/producer/producer.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLE_TTL)*1000, 
        limit: Number(process.env.THROTTLE_LIMIT),
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PostmanModule),
    forwardRef(() => ProducerModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => LoggerModule), ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

