import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
// import { AppConfig } from '../../../libs/shared/src';

async function bootstrap() {
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: process.env.AUTH_QUEUE,
    queueOptions: { durable: true }, 
  },
});
  await app.listen();
  console.log('📦 Auth microservice started successfully');
}
bootstrap();
