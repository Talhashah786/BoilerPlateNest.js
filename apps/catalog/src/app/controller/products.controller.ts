import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from '../services/products.service';

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
}
