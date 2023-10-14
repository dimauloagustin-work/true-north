import { AdditionOperationService } from 'src/application/operations/AdditionOperationService';
import { MockProxy, mock } from 'jest-mock-extended';
import { Operation } from 'src/domain/Operation';
import { Repository } from 'typeorm';
import { Record } from 'src/domain/Record';
import { OperationType } from 'src/domain/OperationType';
//TODO - order folders
describe('BaseOperationService', () => {
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

  it('process without balance', async () => {
    //Arrange
    operationRepo.findOneByOrFail.mockResolvedValue({
      id: 0,
      cost: 7,
      type: OperationType.Addition,
    });
    recordRepo.sum.mockResolvedValue(500);
    const uut = new AdditionOperationService(operationRepo, recordRepo);

    //Act
    const res = async () => await uut.execute(0, 2, 2);

    //Assert
    expect(res).rejects.toThrow("Not enough balance")
  });

  it('process without records', async () => {
    //Arrange
    operationRepo.findOneByOrFail.mockResolvedValue({
      id: 0,
      cost: 7,
      type: OperationType.Addition,
    });
    recordRepo.sum.mockResolvedValue(null);
    const uut = new AdditionOperationService(operationRepo, recordRepo);

    //Act
    const res = await uut.execute(0, 2, 2);

    //Assert
    expect(res.result).toBe("4")
  });
});
