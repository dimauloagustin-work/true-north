import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsNotIn, IsNumber } from 'class-validator';

export class LoginResponse {
  @ApiProperty({ required: true })
  access_token: string;
}
