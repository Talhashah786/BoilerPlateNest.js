
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as Schemas from './schemas';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schemas.Product.name, schema: Schemas.ProductSchema },
      { name: Schemas.User.name, schema: Schemas.UserSchema },
    ]),
  ],
  providers: [],
  exports: [
    MongooseModule,
  ],
})
export class SharedModule {}
