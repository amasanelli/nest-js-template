import { MigrationInterface, QueryRunner } from "typeorm";

export class roles1658947048267 implements MigrationInterface {
    name = 'roles1658947048267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`created_at\``);
    }

}
