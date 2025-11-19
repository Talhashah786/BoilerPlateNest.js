import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'libs/shared/src/dto';
// import { CreateUserDto } from '../../../../../libs/shared/src/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get('users')
  getUsers() {
    return lastValueFrom(this.authClient.send({ cmd: 'get_users' }, {}));
  }

  @Post('users')
  createUser(@Body() body: CreateUserDto) {
    return lastValueFrom(this.authClient.send({ cmd: 'create_user' }, body));
  }
}
