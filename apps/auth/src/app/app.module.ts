import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users.module';
import { AppConfig } from '../../../../libs/shared/src';

@Module({
  imports: [
    MongooseModule.forRoot(AppConfig.mongoUrl),
    UsersModule
  ],
})
export class AppModule {}
