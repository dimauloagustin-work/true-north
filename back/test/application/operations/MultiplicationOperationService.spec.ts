import { MultiplicationOperationService } from 'src/application/operations/MultiplicationOperationService';
import { MockProxy, mock } from 'jest-mock-extended';
import { Operation } from 'src/domain/Operation';
import { Repository } from 'typeorm';
import { Record } from 'src/domain/Record';
import { OperationType } from 'src/domain/OperationType';

describe('MultiplicationOperationService', () => {
  let operationRepo: MockProxy<Repository<Operation>>;
  let recordRepo: MockProxy<Repository<Record>>;

  beforeEach(async () => {
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
      type: OperationType.Multiplication,
    });
    recordRepo.sum.mockResolvedValue(6);
    const uut = new MultiplicationOperationService(operationRepo, recordRepo);

    //Act
    const res = await uut.execute(0, 2, 2);

    //Assert
    expect(res).toBe("4")
  });
});
