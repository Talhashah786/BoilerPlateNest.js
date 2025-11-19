import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'libs/shared/src/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(name: string, email: string) {
    const user = new this.userModel({ name, email });
    return user.save();
  }

  async getUsers() {
    return this.userModel.find().exec();
  }
}
