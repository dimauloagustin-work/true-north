import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from 'src/domain/Operation';
import { Record } from 'src/domain/Record';
import { BaseOperationService } from './BaseOperationService';
import { OperationType } from 'src/domain/OperationType';

@Injectable()
export class SquareRootOperationService extends BaseOperationService {
  constructor(
    @InjectRepository(Operation)
    operationRepository: Repository<Operation>,
    @InjectRepository(Record)
    recordRepository: Repository<Record>,
  ) {
    super(operationRepository, recordRepository, OperationType.SquareRoot);
  }

  async execute(userId: number, n1: number) {
    return this.process(
      () => Promise.resolve(Math.sqrt(n1).toString()),
      userId,
    );
  }
}
