import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683657942110 implements MigrationInterface {
    name = 'Migration1683657942110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET DEFAULT ''`);
    }

}
