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
  @IsOptional()
  @Min(0)
  @Max(100)
  take: number | undefined;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  skip: number | undefined;
}
