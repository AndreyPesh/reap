import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683739091201 implements MigrationInterface {
    name = 'Migration1683739091201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refreshToken" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refreshToken" DROP DEFAULT`);
    }

}
