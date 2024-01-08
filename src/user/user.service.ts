import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { encryptPassword } from '../utils/encrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUserName(userName: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({ userName });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const { userName, password } = user;
      const hashPassword = await encryptPassword(password);
      return await this.userRepository.save({
        userName,
        password: hashPassword,
      });
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }
}
