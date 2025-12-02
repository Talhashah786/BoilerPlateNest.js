import { Controller, Get, Post, Body, Inject, UseGuards, Param, Patch, Delete, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AddCartDto, UpdateCartDto } from '@micro-monorepo/shared';

@ApiTags('Cart')
@Controller('cart')
export class CartGatewayController {
  constructor(
    @Inject('CARD_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  // 🔐 Add to cart
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()  
  @Post('add')
  @ApiBody({ type: AddCartDto })
  addToCart(@Body() body: { item: any }, @Request() req) {
    const userId = req.user.id; // JWT se userId
    return lastValueFrom(
      this.cartClient.send({ cmd: 'add_to_cart' }, { userId, item: body.item })
    );
  }

 // 🔄 Update cart
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Patch('update')
@ApiBody({ type: UpdateCartDto })
updateCart(@Body() body: UpdateCartDto, @Request() req) {
  const userId = req.user.id;

  return lastValueFrom(
    this.cartClient.send(
      { cmd: 'update_cart' },
      {
        userId,
        productId: body.productId,
        quantity: body.quantity
      }
    )
  );
}


  // ❌ Remove from cart
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('remove/:productId')
  removeFromCart(@Param('productId') productId: string, @Request() req) {
    const userId = req.user.id;
    return lastValueFrom(
      this.cartClient.send({ cmd: 'remove_from_cart' }, { userId, productId })
    );
  }

  // 📦 Get user cart
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('get')
  getCart(@Request() req) {
    const userId = req.user.id;
    return lastValueFrom(
      this.cartClient.send({ cmd: 'get_cart' }, { userId })
    );
  }
}
