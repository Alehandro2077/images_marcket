import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { CORS_HOSTS } from './0common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const NODE_ENV = configService.get('NODE_ENV');

  const isDevelopment = NODE_ENV === 'development';

  const PORT = configService.get('PORT') || 8000;

  const logger = new Logger('bootstrap');

  // app.enableCors({
  //   origin: CORS_HOSTS[NODE_ENV],
  //   credentials: true,
  // });
  // app.enableCors({
  //   origin: 'http://localhost:5173',

  //   credentials: true,
  // });http://3.25.23.58:4173/
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://3.25.23.58:4173',
      'project11111.s3-website-ap-southeast-2.amazonaws.com',
      'http://3.25.23.58:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.use(cookieParser());

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('OneLicence')
    .setDescription('')
    .setVersion('1.0')
    .addServer('http://localhost:8080/', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    logger.verbose(`Server is running on port ${PORT}`);
  });
}
bootstrap();
