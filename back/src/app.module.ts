import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Operation } from './domain/Operation';
import { Record } from './domain/Record';
import { User } from './domain/User';
import { AuthController } from './infrastructure/primary/http/auth/controllers/AuthController';
import { LocalStrategy } from './infrastructure/primary/http/auth/LocalStrategy';
import { JwtStrategy } from './infrastructure/primary/http/auth/JwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './application/UserService';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'main',
      entities: [Operation, Record, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Operation, Record, User]),
    PassportModule,
    JwtModule.register({
      secret: 'test', //TODO - move to env
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, LocalStrategy, JwtStrategy, UsersService],
})
export class AppModule {}
