import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonaTercerosVinculadoTable1770390099337 implements MigrationInterface {
    name = 'CreatePersonaTercerosVinculadoTable1770390099337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persona_terceros_vinculado" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipoRelacion" character varying(50) NOT NULL, "observaciones" text, "activo" boolean NOT NULL DEFAULT true, "afiliadoId" uuid NOT NULL, "tercerosVinculadoId" uuid NOT NULL, "administradoraId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_67c30631fa5af9fa5df503d65bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" ADD CONSTRAINT "FK_775560f00a462b9c1a6d7fd3883" FOREIGN KEY ("afiliadoId") REFERENCES "afiliados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" ADD CONSTRAINT "FK_d15423c8a33fba026c438794179" FOREIGN KEY ("tercerosVinculadoId") REFERENCES "terceros_vinculado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" ADD CONSTRAINT "FK_df6b296dff3a99f08625e899f8d" FOREIGN KEY ("administradoraId") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" DROP CONSTRAINT "FK_df6b296dff3a99f08625e899f8d"`);
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" DROP CONSTRAINT "FK_d15423c8a33fba026c438794179"`);
        await queryRunner.query(`ALTER TABLE "persona_terceros_vinculado" DROP CONSTRAINT "FK_775560f00a462b9c1a6d7fd3883"`);
        await queryRunner.query(`DROP TABLE "persona_terceros_vinculado"`);
    }

}
