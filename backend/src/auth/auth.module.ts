import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'jwtConstants.secret',
    signOptions: { expiresIn: '7d' }
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
