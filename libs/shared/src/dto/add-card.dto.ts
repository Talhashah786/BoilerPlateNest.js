import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: '691c453d15480cfd7c7f6a1d',
  })
  productId: string;

  @ApiProperty({
    description: 'Quantity of product',
    example: 2,
  })
  quantity: number;
}

export class AddCartDto {
  @ApiProperty({
    type: CartItemDto,
    description: 'Product item to add to cart',
  })
  item: CartItemDto;
}
