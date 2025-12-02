import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'talha@example.com', type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', type: String })
  @IsString()
  password: string;
}
