import { MockProxy, mock } from 'jest-mock-extended';
import { LocalStrategy } from 'src/infrastructure/primary/http/auth/LocalStrategy';
import { UserService } from 'src/application/UserService';
import { User } from 'src/domain/User';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let userService: MockProxy<UserService>;

  beforeEach(async () => {
    userService = mock<UserService>();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('correct user', async () => {
    //Arrange
    const user: Omit<User, 'password'> = {
      id: 0,
      username: 'test',
      status: true,
    };
    userService.validateUser.mockResolvedValue(user);
    const uut = new LocalStrategy(userService);

    //Act
    const res = await uut.validate('test', 'test');

    //Assert
    expect(res).toBe(user);
  });

  it('incorrect user', async () => {
    //Arrange
    userService.validateUser.mockResolvedValue(null);
    const uut = new LocalStrategy(userService);

    //Act
    const res = async () => await uut.validate('test', 'test');

    //Assert
    expect(res).rejects.toThrow(
      new UnauthorizedException('Incorrect email or password.'),
    );
  });
});
