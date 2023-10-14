import { IRandomStringRepository } from 'src/application/interfaces/IRandomStringRepository';

export class RandomStringRepository implements IRandomStringRepository {
  async get(): Promise<string> {
    return (await fetch(
      'https://www.random.org/strings/?num=1&len=32&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new',
    )).text();
  }
}
