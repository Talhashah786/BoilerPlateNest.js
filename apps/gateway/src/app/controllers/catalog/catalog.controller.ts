import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
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
}
