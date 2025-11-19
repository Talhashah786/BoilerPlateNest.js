import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema  } from '../../../../../libs/shared/src/schemas';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controller/users.controller';
// import { UsersController } from '../controller/User/users.controller';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
