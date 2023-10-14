import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class SquareRootOperation {
  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0)
  n: number;
}