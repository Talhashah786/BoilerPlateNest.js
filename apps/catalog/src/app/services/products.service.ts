import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'libs/shared/src/schemas';
import { Model } from 'mongoose';
import { CreateProductDto } from '@micro-monorepo/shared';

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
  async getProductById(id: string) {
  return this.productModel.findById(id).exec();
}
  // 🔄 UPDATE PRODUCT
  async updateProduct(id: string, dto: CreateProductDto) {
    const updated = await this.productModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!updated) throw new NotFoundException('Product not found');

    return updated;
  }

  // ❌ DELETE PRODUCT
  async deleteProduct(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Product not found');

    return { message: 'Product deleted successfully' };
  }
}
