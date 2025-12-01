import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'libs/shared/src/schemas';
// import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(body) {
    const { name, email, password } = body;

    const exists = await this.userModel.findOne({ email });
    if (exists) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashed,
    });

    return { message: 'User created', user };
  }

  async login(body) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign(
      { id: user._id, email: user.email },
    );

    return { message: 'Login successful', token };
  }
}
