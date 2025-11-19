// catalog/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { Microservices } from 'libs/shared/src';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.CATALOG_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
  console.log('📦 Catalog microservice started successfully');
}
bootstrap();
