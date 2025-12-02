import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartItem, CartService } from '../services/card.service';
// import { CartService, CartItem } from '../services/cart.service';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'add_to_cart' })
  addToCart(@Payload() data: { userId: string; item: CartItem }) {
    console.log('📩 Cart received add_to_cart', data);
    return this.cartService.addToCart(data.userId, data.item);
  }

  @MessagePattern({ cmd: 'update_cart' })
  updateCart(@Payload() data: { userId: string; productId: string; quantity: number }) {
    console.log('📩 Cart received update_cart', data);
    return this.cartService.updateCart(data.userId, data.productId, data.quantity);
  }

  @MessagePattern({ cmd: 'remove_from_cart' })
  removeFromCart(@Payload() data: { userId: string; productId: string }) {
    console.log('📩 Cart received remove_from_cart', data);
    return this.cartService.removeFromCart(data.userId, data.productId);
  }

  @MessagePattern({ cmd: 'get_cart' })
  getCart(@Payload() data: { userId: string }) {
    console.log('📩 Cart received get_cart for user:', data.userId);
    return this.cartService.getCart(data.userId);
  }
}
