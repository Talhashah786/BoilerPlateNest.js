import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_SERVICES } from './rmq.config';

const clients = RMQ_SERVICES.map((svc) => ({
  name: svc.name,
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: svc.queue,
    queueOptions: { durable: true },
  },
}));

@Module({
  imports: [ClientsModule.register(clients as any)],
  exports: [ClientsModule],
})
export class RmqModule {}
