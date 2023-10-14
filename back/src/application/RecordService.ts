import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Record } from 'src/domain/Record';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async find(
    skip: number,
    take: number,
    type: string | undefined = undefined,
    response: string | undefined = undefined,
    balance: number | undefined = undefined,
  ): Promise<{
    result: Record[];
    count: number;
  }> {
    const filters: FindOptionsWhere<Record>[] = [];

    if (!type ?? response ?? balance === undefined)
      filters.push({
        active: true,
      });
    else {
      if (type)
        filters.push({
          operation: {
            type: Like('%' + type + '%'),
          },
          active: true,
        });
      if (response)
        filters.push({
          operation_response: Like('%' + response + '%'),
          active: true,
        });
      if (balance)
        filters.push({
          user_balance: balance,
          active: true,
        });
    }

    const [result, count] = await this.recordRepository.findAndCount({
      relations: {
        operation: true,
      },
      where: filters,
      skip: skip,
      take: take,
    });
    console.log(filters);
    return {
      result,
      count,
    };
  }

  async delete(id: number): Promise<void> {
    await this.recordRepository.update(id, { active: false });
  }
}
