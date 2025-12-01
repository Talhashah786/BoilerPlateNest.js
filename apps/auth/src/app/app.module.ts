import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers & Services
import { AuthController } from './controller/auth.controller';
// import { AuthService } from './service/auth.service';

// User Module (aap already use kar rahe)
import { UsersModule } from './module/users.module';

// JWT Module
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { User, UserSchema } from 'libs/shared/src';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';

@Module({
imports: [
  MongooseModule.forRoot(process.env.MONGO_URL),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({ secret: 'JWT_SECRET_KEY', signOptions: { expiresIn: '7d' } }),
],
providers: [AuthService, UsersService],
controllers: [AuthController, UsersController],

})
export class AppModule {}
