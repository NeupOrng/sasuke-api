import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // get the element that define in dto only
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Sasuke API')
    .setDescription('Sasuke API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors()

  await app.listen(3000);
}
bootstrap();
