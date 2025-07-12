import { Controller, Get, Put, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Put('me')
  async updateProfile(@Request() req, @Body() body: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.id, body);
  }
}
