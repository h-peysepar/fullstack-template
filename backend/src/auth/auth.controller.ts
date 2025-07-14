import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(@Body() body: SignupDto) {
    const token = await this.authService.signup(body);
    return { token };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body);
    return { token };
  }
}
