// catalog/src/products/products.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from '../controller/products.controller';
import { ProductsService } from '../services/products.service';
import { Product, ProductSchema } from '../../../../../libs/shared/src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
