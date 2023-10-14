import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetRecordsQuery {
  @IsString()
  @IsOptional()
  type: string | undefined;

  @IsString()
  @IsOptional()
  response: string | undefined;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  balance: number | undefined;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  take: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  skip: number;
}
