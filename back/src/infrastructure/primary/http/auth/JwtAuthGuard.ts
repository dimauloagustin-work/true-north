import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/domain/User';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export interface JwtRequest {
  user: {
    payload: {
      user: User;
    };
  };
}
