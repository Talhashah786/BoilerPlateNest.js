import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '@micro-monorepo/shared';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 @MessagePattern({ cmd: 'get_products' })
async getProducts() {
  console.log('📩 Catalog received get_products'); // ✅ Add this
  const products = await this.productsService.getProducts();
  console.log('📦 Products fetched from DB:', products); // ✅ Add this
  return products;
}

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(@Payload() data: { name: string; description?: string; price: number }) {
    console.log('📩 Received create_product', data);
    return this.productsService.createProduct(data);
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
async getProductById(@Payload() id: string) {
  console.log('📩 Catalog received get_product_by_id:', id);
  return this.productsService.getProductById(id);
}
@MessagePattern({ cmd: 'update_product' })
  updateProduct(data: { id: string; body: CreateProductDto }) {
    return this.productsService.updateProduct(data.id, data.body);
  }

  @MessagePattern({ cmd: 'delete_product' })
  deleteProduct(id: string) {
    return this.productsService.deleteProduct(id);
  }

}
