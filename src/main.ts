import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('APP_PORT');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest template')
    .setDescription('A Nest JS template')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Please enter a valid bearer token',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        in: 'Header',
        type: 'http',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
