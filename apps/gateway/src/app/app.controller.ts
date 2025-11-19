import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()   // 👈 Swagger se hide
@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'gateway ok' };
  }
}

// import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { lastValueFrom } from 'rxjs';
// import {  ApiTags } from '@nestjs/swagger';
// import { CreateUserDto } from '../../../../libs/shared/src/dto';
// import { CreateProductDto } from '../../../../libs/shared/src/dto';

// @Controller('rrr')
// export class AppController {
//   constructor(
//     @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
//     @Inject('CATALOG_SERVICE') private readonly catalogClient: ClientProxy,
//   ) {}

//   @ApiTags('Auth')
//   @Get('users')
//   getUsers() {
//     return lastValueFrom(this.authClient.send({ cmd: 'get_users' }, {}));
//   }

//   @ApiTags('Auth')
//   @Post('users')
//   createUser(@Body() body: CreateUserDto) {
//     return lastValueFrom(this.authClient.send({ cmd: 'create_user' }, body));
//   }

//   @ApiTags('Catalog')
//   @Get('products')
//   getProducts() {
//     return lastValueFrom(this.catalogClient.send({ cmd: 'get_products' }, {}));
//   }

//   @ApiTags('Catalog')
//   @Post('products')
//   createProduct(@Body() body: CreateProductDto) {
//     return lastValueFrom(this.catalogClient.send({ cmd: 'create_product' }, body));
//   }
// }
