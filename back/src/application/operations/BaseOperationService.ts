import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Operation } from 'src/domain/Operation';
import { OperationType } from 'src/domain/OperationType';
import { Record } from 'src/domain/Record';

@Injectable()
export abstract class BaseOperationService {
  private readonly initialBalance: number;

  constructor(
    private readonly operationRepository: Repository<Operation>,
    private readonly recordRepository: Repository<Record>,
    private readonly type: OperationType
  ) {
    this.initialBalance = 500;
  }

  protected async process(
    executable: () => Promise<string>,
    userId: number,
  ): Promise<string> {
    const operation = await this.operationRepository.findOneByOrFail({
      type: this.type,
    });
    console.log(this.type);
    let currentBalance = await this.getBalance(userId);

    if (currentBalance < operation.cost)
      throw new BadRequestException('Not enough balance');

    const result = await executable();

    currentBalance -= operation.cost;
    await this.registerOperation(
      userId,
      result,
      currentBalance,
      operation.id,
      operation.cost,
    );

    return result;
  }

  protected async getBalance(userId: number): Promise<number> {
    return (
      this.initialBalance -
      ((await this.recordRepository.sum('amount', {
        user: { id: userId },
      })) ?? 0)
    );
  }

  protected async registerOperation(
    userId: number,
    response: string,
    newBalance: number,
    operationId: number,
    operationCost: number,
  ): Promise<number> {
    this.recordRepository.save({
      user: { id: userId },
      operation: { id: operationId },
      operation_response: response,
      amount: operationCost,
      user_balance: newBalance,
    });

    return newBalance;
  }
}
