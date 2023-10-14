import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from 'src/domain/Operation';
import { Record } from 'src/domain/Record';
import { BaseOperationService } from './BaseOperationService';
import {
  IRandomStringRepository,
  IRandomStringRepositoryKey,
} from '../interfaces/IRandomStringRepository';

@Injectable()
export class RandomStringOperationService extends BaseOperationService {
  constructor(
    @Inject(IRandomStringRepositoryKey)
    private readonly rsRepository: IRandomStringRepository,
    @InjectRepository(Operation)
    operationRepository: Repository<Operation>,
    @InjectRepository(Record)
    recordRepository: Repository<Record>,
  ) {
    super(operationRepository, recordRepository);
  }

  async execute(userId: number) {
    return this.process(
      () => this.rsRepository.get(),
      userId,
    );
  }
}
