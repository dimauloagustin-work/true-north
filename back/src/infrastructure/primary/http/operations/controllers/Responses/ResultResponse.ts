import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsNotIn, IsNumber } from 'class-validator';

export class ResultResponse {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotIn([0])
  result: string;

  constructor(result: string) {
    this.result = result;
  }
}
