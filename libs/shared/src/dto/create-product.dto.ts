import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', type: String, required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Highwww-end gaming laptop', type: String, required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1800, type: Number, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
