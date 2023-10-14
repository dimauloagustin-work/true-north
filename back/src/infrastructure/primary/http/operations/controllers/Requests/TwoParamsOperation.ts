import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class TwoParamsOperation {
  @ApiProperty({ required: true })
  @IsNumber()
  n1: number;

  @ApiProperty({ required: true })
  @IsNumber()
  n2: number;
}