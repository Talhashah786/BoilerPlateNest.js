import { Module } from '@nestjs/common';
import { CartController } from './controller/card.controller';
import { CartService } from './services/card.service';
// import { CartController } from './controller/cart.controller';
// import { CartService } from './services/cart.service';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
