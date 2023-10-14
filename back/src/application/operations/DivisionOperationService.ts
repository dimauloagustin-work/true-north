import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from 'src/domain/Operation';
import { Record } from 'src/domain/Record';
import { BaseOperationService } from './BaseOperationService';

@Injectable()
export class DivisionOperationService extends BaseOperationService {
  constructor(
    @InjectRepository(Operation)
    operationRepository: Repository<Operation>,
    @InjectRepository(Record)
    recordRepository: Repository<Record>,
  ) {
    super(operationRepository, recordRepository);
  }

  async execute(userId: number, n1: number, n2: number) {
    return this.process(() => Promise.resolve((n1 / n2).toString()), userId);
  }
}
