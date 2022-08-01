import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm"
import { RoleSeed } from "../seeds/role.seed";
import { UserSeed } from "../seeds/user.seed";

export class initialSeeding1659376102760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const role: ResultSetHeader = await queryRunner.query(`INSERT INTO \`role\` (\`name\`, \`description\`, \`type\`) VALUES ("${RoleSeed.name}", "${RoleSeed.description}", "${RoleSeed.type}")`);
        const user: ResultSetHeader = await queryRunner.query(`INSERT INTO \`user\` (\`name\`, \`password\`) VALUES ("${UserSeed.name}", "${UserSeed.password}")`);
        await queryRunner.query(`INSERT INTO \`user_roles_role\` (\`userId\`, \`roleId\`) VALUES ("${user.insertId}", "${role.insertId}")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
