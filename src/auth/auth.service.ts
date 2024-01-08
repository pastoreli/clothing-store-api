import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { SignInResponseDto } from './dto/signInResponseDto';
import { encryptCompare } from 'src/utils/encrypt';
import { SigninUserDto } from './dto/signinUserDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: UserEntity): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  async signIn(user: SigninUserDto): Promise<SignInResponseDto> {
    try {
      const { userName, password } = user;
      const response = await this.userService.findByUserName(userName);
      if (!encryptCompare(password, response.password)) {
        throw new NotFoundException('User not found.');
      }

      const token = await this.jwtService.signAsync({
        id: response?.id,
        usserName: userName,
      });
      return { token };
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }
}
