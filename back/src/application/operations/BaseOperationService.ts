import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Operation } from 'src/domain/Operation';
import { OperationType } from 'src/domain/OperationType';
import { Record } from 'src/domain/Record';

@Injectable()
export abstract class BaseOperationService {
  private readonly initialBalance: number;
  protected readonly type: OperationType;

  constructor(
    private readonly operationRepository: Repository<Operation>,
    private readonly recordRepository: Repository<Record>,
  ) {
    this.initialBalance = 500;
  }

  protected async process(
    executable: () => Promise<string>,
    userId: number,
  ): Promise<{
    result: string;
    currentBalance: number;
  }> {
    if (!(await this.hasEnoughBalance(userId)))
      throw new BadRequestException('Not enough balance');

    const result = await executable();

    return {
      result: result,
      currentBalance: await this.registerOperation(userId, result),
    };
  }

  protected async hasEnoughBalance(userId: number): Promise<boolean> {
    //TODO - refactor to reuse
    const operation = await this.operationRepository.findOneByOrFail({
      type: this.type,
    });
    const currentBalance =
      this.initialBalance -
      ((await this.recordRepository.sum('amount', {
        user: { id: userId },
      })) ?? 0);
    return currentBalance >= operation.cost;
  }

  protected async registerOperation(
    userId: number,
    response: string,
  ): Promise<number> {
    //TODO - refactor to reuse
    const operation = await this.operationRepository.findOneByOrFail({
      type: this.type,
    });
    const currentBalance =
      this.initialBalance -
      ((await this.recordRepository.sum('amount', {
        user: { id: userId },
      })) ?? 0);

    const newBalance = currentBalance - operation.cost;

    this.recordRepository.save({
      user: { id: userId },
      operation: { id: operation.id },
      operation_response: response,
      amount: operation.cost,
      user_balance: newBalance,
    });

    return newBalance;
  }
}
