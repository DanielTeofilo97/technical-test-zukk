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
    .setTitle('API - Rural Management Backend')
    .setDescription('API REST desenvolvido com NestJs e PostgreSQL')
    .setVersion('1.0')
    .addServer('http://localhost:3049', 'Local Development')
    .addServer('https://technical-test-zukk-production.up.railway.app','Prod')
    .addTag('auth')
    .addTag('users')
    .addTag('producers')
    .addTag('cultures')
    .addTag('metrics')
    .addTag('postman')
    .setContact(
      'Daniel Teófilo da Silva',
      'https://br.linkedin.com/in/daniel-te%C3%B3filo-108a0222b',
      'feitordaniel@live.com'
    )
    .setExternalDoc('Baixar Collection Postman 📁', `${process.env.BASE_URL}/postman/collection`)
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