
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../../application/UserService';
import { User } from 'src/domain/User';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
        usernameField: 'name',
        passwordField: 'pass',
      });
  }

  async validate(username: string, pass: string): Promise<Omit<User, "password">> {
    const user = await this.userService.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException("Incorrect email or password.");
    }
    return user;
  }
}