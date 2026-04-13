import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = app.get(ConfigService);

  app.enableCors({ origin: cfg.get('FRONTEND_ORIGIN') });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const doc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Train API')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('docs', app, doc);

  const port = cfg.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`🚀  http://localhost:${port}/docs`);
}
bootstrap();
