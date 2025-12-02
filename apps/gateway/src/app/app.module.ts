import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthGatewayController } from './controllers/auth/auth.controller';
import { CatalogGatewayController } from './controllers/catalog/catalog.controller';
import { RmqModule } from '../../../../libs/shared/src/rmq/rmq.module';  
import { CartGatewayController } from './controllers/card/card.controller';

@Module({
  imports: [RmqModule],
  controllers: [
    AppController,
    AuthGatewayController,
    CatalogGatewayController,
     CartGatewayController,
   
  ],
})
export class AppModule {}

