import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './module/products.module';
import { Product, ProductSchema } from 'libs/shared/src/schemas';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './services/products.service';
// import { AppConfig } from '../../../../libs/shared/src';
// import { Product, ProductSchema } from '../../../../../libs/shared/src/schemas';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
   MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
