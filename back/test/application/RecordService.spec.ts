import { MockProxy, mock } from 'jest-mock-extended';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { User } from 'src/domain/User';
import { Record } from 'src/domain/Record';
import { RecordService } from 'src/application/RecordService';
import { Operation } from 'src/domain/Operation';

describe('RecordService', () => {
  let recordRepo: MockProxy<Repository<Record>>;

  beforeEach(async () => {
    recordRepo = mock<Repository<Record>>();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should use basic filters', async () => {
    //Arrange
    let filters: FindManyOptions<Record> | undefined;
    recordRepo.findAndCount.mockImplementation((f) => {
      if (!f) throw new Error('test error - filters should be used');
      filters = f;
      return Promise.resolve([[], 0]);
    });
    const uut = new RecordService(recordRepo);

    //Act
    const res = await uut.find(1, 1);

    //Assert
    expect(filters?.skip).toBe(1);
    expect(filters?.take).toBe(1);
    expect(filters?.where).toEqual([
      {
        active: true,
      },
    ]);
  });

  it('should use complex filters', async () => {
    //Arrange
    let filters: FindManyOptions<Record> | undefined;
    recordRepo.findAndCount.mockImplementation((f) => {
      if (!f) throw new Error('test error - filters should be used');
      filters = f;
      return Promise.resolve([[], 0]);
    });
    const uut = new RecordService(recordRepo);

    //Act
    await uut.find(1, 1, 'test', 'test', 4);

    //Assert
    expect(filters?.skip).toBe(1);
    expect(filters?.take).toBe(1);
    expect(filters?.where).toEqual([
      {
        operation: {
          type: Like('%test%'),
        },
        active: true,
      },
      {
        operation_response: Like('%test%'),
        active: true,
      },
      {
        user_balance: 4,
        active: true,
      },
    ]);
  });

  it('should soft delete records', async () => {
    //Arrange
    recordRepo.save.mockImplementation((r) => {
      if (r.active === undefined) throw new Error('test error - active prop should be send');
      expect(r.active).toBeTruthy();
      
      return Promise.resolve({
        id: 0,
        active: r.active,
        amount: 10,
        created_at: new Date(),
        operation: mock<Operation>(),
        operation_response: '3',
        user_balance: 10,
        user: mock<User>(),
      });
    });
    const uut = new RecordService(recordRepo);

    //Act
    await uut.delete(0);
  });
});
