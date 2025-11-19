import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
// import { UsersService } from '../../services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: { name: string; email: string }) {
    return this.usersService.createUser(data.name, data.email);
  }
}

