import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();

    const header = req.headers['authorization'];
    if (!header) {
      throw new UnauthorizedException('Authorization header missing'); // <--- Swagger me "Authorization required" show karega
    }

    const token = header.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'JWT_SECRET_KEY');
      req.user = decoded;
      return true;
    } catch(err) {
      throw new UnauthorizedException('Invalid or expired token'); // <--- Swagger me "Authorization required" show karega
    }
  }
}
