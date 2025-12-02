import { Injectable, NotFoundException } from '@nestjs/common';

export interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable()
export class CartService {
  // simple in-memory cart storage
  private carts: Record<string, CartItem[]> = {};

  // 🛒 ADD ITEM
  addToCart(userId: string, item: CartItem) {
    if (!this.carts[userId]) this.carts[userId] = [];
    this.carts[userId].push(item);
    return this.carts[userId];
  }

  // 🔄 UPDATE ITEM QUANTITY
  updateCart(userId: string, productId: string, quantity: number) {
    const cart = this.carts[userId] || [];
    const item = cart.find(i => i.productId === productId);
    if (!item) throw new NotFoundException('Product not in cart');
    item.quantity = quantity;
    return cart;
  }

  // ❌ REMOVE ITEM
  removeFromCart(userId: string, productId: string) {
    const cart = this.carts[userId] || [];
    const index = cart.findIndex(i => i.productId === productId);
    if (index === -1) throw new NotFoundException('Product not in cart');
    cart.splice(index, 1);
    this.carts[userId] = cart;
    return cart;
  }

  // 📦 GET CART
  getCart(userId: string) {
    return this.carts[userId] || [];
  }
}
