import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697292388508 implements MigrationInterface {
    name = 'Migrations1697292388508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO main.\`user\` (username, password, status) VALUES(\`test@test.com\`, \`$2b$10$WKpQm7UUKA8lmw.4.Qt0xeqlHhCOZye5sEJY888.CWp0rveHsbyju\`, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from main.user where user.username = \`test@test.com\``);
    }

}
