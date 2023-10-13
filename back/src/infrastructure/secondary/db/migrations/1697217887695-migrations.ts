import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697217887695 implements MigrationInterface {
    name = 'Migrations1697217887695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`date\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`date\` datetime NOT NULL`);
    }

}
