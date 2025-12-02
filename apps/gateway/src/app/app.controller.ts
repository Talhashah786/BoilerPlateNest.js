import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()   // 👈 Swagger se hide
@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'gateway ok' };
  }
}

