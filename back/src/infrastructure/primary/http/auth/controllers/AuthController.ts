import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { UserRequest } from './Requests/UserRequest';
import { UsersService } from 'src/application/UserService';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from '../LocalAuthGuard';
import { User } from 'src/domain/User';
import { JwtAuthGuard } from '../JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _body: UserRequest, @Request() req: { user: User }) {
    const payload = {
      user: {
        id: req.user.id,
        name: req.user.username,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('register') //TODO - make rest
  async register(@Body() req: UserRequest) {
    await this.userService.create(req.name, req.pass);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }
}
