import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'libs/shared/src/dto';
// import { CreateProductDto } from '../../../../../libs/shared/src/dto';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogGatewayController {
  constructor(
    @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
  ) {}

  @Get('products')
  getProducts() {
    return lastValueFrom(this.catalogClient.send({ cmd: 'get_products' }, {}));
  }

  @Post('products')
  createProduct(@Body() body: CreateProductDto) {
    return lastValueFrom(this.catalogClient.send({ cmd: 'create_product' }, body));
  }
}
