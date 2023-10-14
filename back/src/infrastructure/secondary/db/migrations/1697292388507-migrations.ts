import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697292388507 implements MigrationInterface {
    name = 'Migrations1697292388507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`active\` tinyint NOT NULL DEFAULT TRUE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`active\``);
    }

}
