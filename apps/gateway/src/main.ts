import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); 

  const config = new DocumentBuilder()
    .setTitle('Microservices API')
    .setDescription('Gateway API for Auth & Catalog microservices')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger', app, document);
  await app.listen(4000);

  console.log('Gateway running on http://localhost:4000/swagger');
}
bootstrap();
