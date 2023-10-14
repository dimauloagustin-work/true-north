import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Operation } from './domain/Operation';
import { Record } from './domain/Record';
import { User } from './domain/User';
import { AuthController } from './infrastructure/primary/http/auth/controllers/AuthController';
import { LocalStrategy } from './infrastructure/primary/http/auth/LocalStrategy';
import { JwtStrategy } from './infrastructure/primary/http/auth/JwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './application/UserService';
import { AdditionOperationService } from './application/operations/AdditionOperationService';
import { OperationsController } from './infrastructure/primary/http/operations/controllers/OperationsController';
import { SquareRootOperationService } from './application/operations/SquareRootOperationService';
import { DivisionOperationService } from './application/operations/DivisionOperationService';
import { MultiplicationOperationService } from './application/operations/MultiplicationOperationService';
import { SubtractionOperationService } from './application/operations/SubstractionOperationService';
import { RecordService } from './application/RecordService';
import { RandomStringOperationService } from './application/operations/RandomStringOperationService';
import { IRandomStringRepositoryKey } from './application/interfaces/IRandomStringRepository';
import { RandomStringRepository } from './infrastructure/secondary/web-services/random-string/RandomStringRepository';

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
    }),
    TypeOrmModule.forFeature([Operation, Record, User]),
    PassportModule,
    JwtModule.register({
      secret: 'test', //TODO - move to env
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController, OperationsController],
  providers: [
    AppService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    AdditionOperationService,
    SubtractionOperationService,
    MultiplicationOperationService,
    DivisionOperationService,
    SquareRootOperationService,
    RandomStringOperationService,
    RecordService,
    { provide: IRandomStringRepositoryKey, useClass: RandomStringRepository },
  ],
})
export class AppModule {}
