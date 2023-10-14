import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Record } from 'src/domain/Record';

class OperationResponse {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  cost: number;

  @ApiProperty({ required: true })
  balance: number;

  @ApiProperty({ required: true })
  response: string;

  @ApiProperty({ required: true })
  public type: string;

  @ApiProperty({ required: true })
  public created_at: Date;

  constructor(record: Record) {
    this.id = record.id;
    this.cost = record.amount;
    this.balance = record.user_balance;
    this.response = record.operation_response;
    this.type = record.operation.type;
    this.created_at = record.created_at;
  }
}

@ApiResponse({})
export class OperationsResponse {
  @ApiProperty({ required: true, isArray: true, type: OperationResponse })
  result: OperationResponse[];
  @ApiProperty({ required: true })
  count: number;

  constructor(records: Record[], count: number) {
    this.result = records.map((r) => {
      return new OperationResponse(r);
    });
    this.count = count;
  }
}
