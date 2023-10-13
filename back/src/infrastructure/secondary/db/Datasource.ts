import { Operation } from '../../../domain/Operation';
import { Record } from '../../../domain/Record';
import { User } from '../../../domain/User';
import { DataSource } from 'typeorm';

class Datasource {
  public static createDatasource(): DataSource {
    return new DataSource({
      type: 'mariadb',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'main',
      entities: [Operation, Record, User],
      migrations: ['**/migrations/**/*.{ts,js}'],
    });
  }
}

export const datasource = Datasource.createDatasource();
