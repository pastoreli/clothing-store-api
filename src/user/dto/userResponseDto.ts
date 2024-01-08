import mongoose from 'mongoose';
import { UserEntity } from '../entity/user.entity';

export class UserResponseDto extends UserEntity {
  _id: mongoose.Types.ObjectId;
}
