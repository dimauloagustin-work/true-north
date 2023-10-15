import { RandomStringOperationService } from 'src/application/operations/RandomStringOperationService';
import { MockProxy, mock } from 'jest-mock-extended';
import { Operation } from 'src/domain/Operation';
import { Repository } from 'typeorm';
import { Record } from 'src/domain/Record';
import { OperationType } from 'src/domain/OperationType';
import { IRandomStringRepository } from 'src/application/interfaces/IRandomStringRepository';

describe('RandomStringOperationService', () => {
  let rsRepo: MockProxy<IRandomStringRepository>;
  let operationRepo: MockProxy<Repository<Operation>>;
  let recordRepo: MockProxy<Repository<Record>>;

  beforeEach(async () => {
    rsRepo = mock<IRandomStringRepository>();
    operationRepo = mock<Repository<Operation>>();
    recordRepo = mock<Repository<Record>>();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('execute', async () => {
    //Arrange
    operationRepo.findOneByOrFail.mockResolvedValue({
      id: 0,
      cost: 5,
      type: OperationType.RandomString,
    });
    recordRepo.sum.mockResolvedValue(6);
    rsRepo.get.mockResolvedValue("test")
    const uut = new RandomStringOperationService(rsRepo, operationRepo, recordRepo);

    //Act
    const res = await uut.execute(0);

    //Assert
    expect(res).toBe("test")
  });
});
