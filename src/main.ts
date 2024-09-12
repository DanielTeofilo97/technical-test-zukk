import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogHttpInterceptor } from './interceptors/log.interceptor';
import { join } from 'path';
import * as express from 'express';


const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Producers')
    .setDescription('API REST desenvolvido com NestJs e PostgreSQL')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('producers')
    .addTag('categories')
    .addTag('postman')
    .setContact(
      'Daniel Teófilo da Silva',
      'https://br.linkedin.com/in/daniel-te%C3%B3filo-108a0222b',
      'feitordaniel@live.com'
    )
    .setExternalDoc('Baixar Collection Postman 📁', `http://localhost:${process.env.PORT}/postman/collection`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogHttpInterceptor());
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT, () =>
    logger.log(
      `API vehicles running on port ${process.env.PORT} | env: ${process.env.NODE_ENV} `,
    ),
  );
}
bootstrap();