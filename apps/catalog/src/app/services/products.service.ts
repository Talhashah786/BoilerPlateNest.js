import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'libs/shared/src/schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async createProduct(payload: { name: string; description?: string; price: number }) {
    const p = new this.productModel(payload);
    return p.save();
  }

  async getProducts() {
    return this.productModel.find().exec();
  }
}
