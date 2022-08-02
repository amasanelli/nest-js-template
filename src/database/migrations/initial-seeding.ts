import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { ResultSetHeader } from 'mysql2';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleSeed } from '../seeds/role.seed';
import { UserSeed } from '../seeds/user.seed';

config();

export class initialSeeding1659376102761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role: ResultSetHeader = await queryRunner.query(
      `INSERT INTO \`role\` (\`name\`, \`description\`, \`type\`) VALUES ("${RoleSeed.name}", "${RoleSeed.description}", "${RoleSeed.type}")`,
    );

    const configService = new ConfigService();
    const password = bcrypt.hashSync(
      UserSeed.password,
      +configService.get<string>('SALT_ROUNDS'),
    );

    const user: ResultSetHeader = await queryRunner.query(
      `INSERT INTO \`user\` (\`name\`, \`password\`) VALUES ("${UserSeed.name}", "${password}")`,
    );
    await queryRunner.query(
      `INSERT INTO \`user_roles_role\` (\`userId\`, \`roleId\`) VALUES ("${user.insertId}", "${role.insertId}")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
