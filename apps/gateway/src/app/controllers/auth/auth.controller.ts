import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
// import { CreateUserDto, LoginDto } from 'libs/shared/src/dto';
import { CreateUserDto, LoginDto } from '@micro-monorepo/shared';


@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
constructor(
@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
) {}

// ✅ Signup
@Post('signup')
signup(@Body() body: CreateUserDto) {
return lastValueFrom(
this.authClient.send({ cmd: 'signup' }, body)
);
}

// ✅ Login
@Post('loginn')
login(@Body() body: LoginDto) {
return lastValueFrom(
this.authClient.send({ cmd: 'login' }, body)
);
}
}
