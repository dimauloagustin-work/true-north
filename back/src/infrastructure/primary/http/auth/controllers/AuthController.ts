import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserRequest } from './Requests/UserRequest';
import { UserService } from 'src/application/UserService';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from '../LocalAuthGuard';
import { User } from 'src/domain/User';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './Responses/LoginResponse';

@Controller({
  path:'auth',
  version:'1'
})
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponse,
  })
  async login(
    @Body() _body: UserRequest,
    @Request() req: { user: User },
  ): Promise<LoginResponse> {
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
 
  @Post('register')
  async register(@Body() req: UserRequest) {
    await this.userService.create(req.name, req.pass);
  }
  
 /*
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: JwtRequest) {
    return req.user;
  }*/
}
