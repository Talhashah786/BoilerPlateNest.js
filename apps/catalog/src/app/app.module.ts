import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './module/products.module';
import { AppConfig } from '../../../../libs/shared/src';

@Module({
  imports: [
    MongooseModule.forRoot(AppConfig.mongoUrl),
    ProductsModule, 
  ],
})
export class AppModule {}
