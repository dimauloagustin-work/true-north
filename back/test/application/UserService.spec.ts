import { MockProxy, mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { User } from 'src/domain/User';
import { UserService } from 'src/application/UserService';
import { hash } from 'bcrypt';

describe('UserService', () => {
  let userRepo: MockProxy<Repository<User>>;

  beforeEach(async () => {
    userRepo = mock<Repository<User>>();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return user', async () => {
    //Arrange
    const user: User = {
      id: 0,
      username: 'test',
      status: true,
      password: 'test',
    };
    userRepo.findOne.mockResolvedValue(user);
    const uut = new UserService(userRepo);

    //Act
    const res = await uut.findOneByName('test');

    //Assert
    expect(res).toBe(user);
  });

  it('should return null', async () => {
    //Arrange
    userRepo.findOne.mockResolvedValue(null);
    const uut = new UserService(userRepo);

    //Act
    const res = await uut.findOneByName('test');

    //Assert
    expect(res).toBeNull();
  });

  it('should return user with not visible pass', async () => {
    //Arrange
    userRepo.save.mockImplementation(async (e) => {
      if (!e.username || !e.password)
        throw new Error('test error - values should be passed');
      return Promise.resolve({
        id: 0,
        status: true,
        username: e.username,
        password: e.password,
      });
    });
    const uut = new UserService(userRepo);

    //Act
    const res = await uut.create('test', 'test');

    //Assert
    expect(res.username).toBe('test');
    expect(res.password).not.toBe('test');
  });

  it('should be valid user', async () => {
    //Arrange
    const user: User = {
      id: 0,
      username: 'test',
      status: true,
      password: await hash('test', 10),
    };
    userRepo.findOne.mockResolvedValue(user);
    const uut = new UserService(userRepo);

    //Act
    const res = await uut.validateUser('test', 'test');

    //Assert
    const { password, ...userWithoutPass } = user;
    expect(res).toEqual(userWithoutPass);
  });

  it('should not be valid user', async () => {
    //Arrange
    const user: User = {
      id: 0,
      username: 'test',
      status: true,
      password: await hash('test2', 10),
    };
    userRepo.findOne.mockResolvedValue(user);
    const uut = new UserService(userRepo);

    //Act
    const res = await uut.validateUser('test', 'test');

    //Assert
    expect(res).toEqual(null);
  });
});
