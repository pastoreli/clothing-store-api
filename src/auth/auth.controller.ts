import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUserDto';
import { SignInResponseDto } from './dto/signInResponseDto';
import { SigninUserDto } from './dto/signinUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body()
    body: RegisterUserDto,
  ): Promise<any> {
    return this.authService.register(body);
  }

  @Post('/signin')
  async signin(
    @Body()
    body: SigninUserDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }
}
