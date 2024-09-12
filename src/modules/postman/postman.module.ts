import { Module } from '@nestjs/common';
import { PostmanController } from './postman.controller';

@Module({
  controllers: [PostmanController]
})
export class PostmanModule {}
