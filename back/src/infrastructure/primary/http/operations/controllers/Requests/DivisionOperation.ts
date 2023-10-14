import { ApiProperty } from "@nestjs/swagger";
import { IsNotIn, IsNumber } from "class-validator";

export class DivisionOperation {
  @ApiProperty({ required: true })
  @IsNumber()
  n1: number;
  
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotIn([0])
  n2: number;
}