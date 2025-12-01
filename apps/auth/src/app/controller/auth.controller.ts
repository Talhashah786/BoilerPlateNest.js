import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../../../../../libs/shared/src';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signup' })
  signup(data: CreateUserDto) {
    return this.authService.signup(data);
  }

  @MessagePattern({ cmd: 'login' })
  login(data: LoginDto) {
    return this.authService.login(data);
  }
}
