import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/User';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByName(name: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username: name } });
  }

  async create(name: string, pass: string): Promise<User | null> {
    const hpass = await hash(pass, 10);

    return await this.usersRepository.save({
      username: name,
      password: hpass,
      status: true,
    });
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findOneByName(email);
    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
