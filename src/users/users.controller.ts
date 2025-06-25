import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.create(email, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { userId: req.user.userId, email: req.user.email };
  }
}
