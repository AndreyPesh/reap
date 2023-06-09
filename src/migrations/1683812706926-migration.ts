import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683812706926 implements MigrationInterface {
    name = 'Migration1683812706926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(120) NOT NULL, "password" character varying NOT NULL, "email" character varying(120) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "refreshToken" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
