import { Controller, Get, Post, Body, Inject, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from '@micro-monorepo/shared';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogGatewayController {
  constructor(
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
  ) {}

   // 🔐 Protected: Create product (requires login)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()  
  @Post('products')
  createProduct(@Body() body: CreateProductDto) {
    return lastValueFrom(
      this.catalogClient.send({ cmd: 'create_product' }, body)
    );
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('products-create')
  getProducts() {
    return lastValueFrom(this.catalogClient.send({ cmd: 'get_products' }, {}));
  }

  @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Get('products/:id')
getProductById(@Param('id') id: string) {
  return lastValueFrom(
    this.catalogClient.send({ cmd: 'get_product_by_id' }, id)
  );
}


  // 🔄 UPDATE PRODUCT
  @Patch('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateProduct(@Param('id') id: string, @Body() body: CreateProductDto) {
    return lastValueFrom(
      this.catalogClient.send({ cmd: 'update_product' }, { id, body })
    );
  }

  // ❌ DELETE PRODUCT
  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteProduct(@Param('id') id: string) {
    return lastValueFrom(
      this.catalogClient.send({ cmd: 'delete_product' }, id)
    );
  }

}
