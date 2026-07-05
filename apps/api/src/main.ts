import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Credit Card System API')
    .setDescription('Phase 1 purchase and transaction history API')
    .setVersion('1.0')
    .addTag('purchase')
    .addTag('transactions')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 4400;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

void bootstrap();
