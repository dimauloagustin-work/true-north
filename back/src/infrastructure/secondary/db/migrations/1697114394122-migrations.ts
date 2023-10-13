import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1697114394122 implements MigrationInterface {
  name = 'Migrations1697114394122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`operation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`cost\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`user_balance\` int NOT NULL, \`operation_response\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`user_id\` int NULL, \`operation_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`record\` ADD CONSTRAINT \`FK_e28cccb0d33870ac1f81f7a727d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`record\` ADD CONSTRAINT \`FK_dfb4a21d5021ce5c510d4855ed1\` FOREIGN KEY (\`operation_id\`) REFERENCES \`operation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Addss operation records
    await queryRunner.query(
      `INSERT INTO \`operation\` (\`type\`, \`cost\`) VALUES ('addition', 10), ('subtraction', 5), ('multiplication', 15), ('division', 8), ('square_root', 20), ('random_string', 5)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`record\` DROP FOREIGN KEY \`FK_dfb4a21d5021ce5c510d4855ed1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`record\` DROP FOREIGN KEY \`FK_e28cccb0d33870ac1f81f7a727d\``,
    );
    await queryRunner.query(`DROP TABLE \`record\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`operation\``);
  }
}
