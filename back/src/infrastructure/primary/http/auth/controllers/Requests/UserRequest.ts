import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserRequest {
  @IsEmail()
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  pass: string;
}