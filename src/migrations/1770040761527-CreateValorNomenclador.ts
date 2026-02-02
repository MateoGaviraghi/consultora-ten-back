import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateValorNomenclador1770040761527 implements MigrationInterface {
    name = 'CreateValorNomenclador1770040761527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."valores_nomenclador_etapa_enum" AS ENUM('vigente', 'etapa1', 'etapa2', 'etapa3')`);
        await queryRunner.query(`CREATE TABLE "valores_nomenclador" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nomenclador_id" uuid NOT NULL, "valor" numeric(10,2) NOT NULL, "fecha_vigencia" date NOT NULL, "etapa" "public"."valores_nomenclador_etapa_enum" NOT NULL DEFAULT 'vigente', "descripcion" text, "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_52fd7d3b8c109a8fe730b3b92a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "valores_nomenclador" ADD CONSTRAINT "FK_6b576078282da7302dd35b7f803" FOREIGN KEY ("nomenclador_id") REFERENCES "nomencladores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "valores_nomenclador" DROP CONSTRAINT "FK_6b576078282da7302dd35b7f803"`);
        await queryRunner.query(`DROP TABLE "valores_nomenclador"`);
        await queryRunner.query(`DROP TYPE "public"."valores_nomenclador_etapa_enum"`);
    }

}
