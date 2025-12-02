import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty({
    description: 'Product ID to update',
    example: '691d646f6325adf2ef03a898',
  })
  productId: string;

  @ApiProperty({
    description: 'Updated quantity',
    example: 3,
  })
  quantity: number;
}
