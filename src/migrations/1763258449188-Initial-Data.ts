import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialData1763258449188 implements MigrationInterface {
    name = 'InitialData1763258449188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "algorithm" character varying NOT NULL, "parameters" character varying, "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
