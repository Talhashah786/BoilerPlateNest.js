import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthGatewayController } from './controllers/auth/auth.controller';
import { CatalogGatewayController } from './controllers/catalog/catalog.controller';
import { RmqModule } from '../../../../libs/shared/src/rmq/rmq.module';  

@Module({
  imports: [RmqModule],
  controllers: [
    AppController,
    AuthGatewayController,
    CatalogGatewayController,
  ],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AppController } from './app.controller';
// import { AuthGatewayController } from './controllers/auth/auth.controller';
// import { CatalogGatewayController } from './controllers/catalog/catalog.controller';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'AUTH_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://localhost:5672'],
//           queue: 'auth_queue',
//           queueOptions: { durable: true },
//         },
//       },
//       {
//         name: 'CATALOG_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://localhost:5672'],
//           queue: 'catalog_queue',
//           queueOptions: { durable: true },
//         },
//       },
//     ]),
//   ],
//   controllers: [AppController, AuthGatewayController, CatalogGatewayController],
// })
// export class AppModule {}
