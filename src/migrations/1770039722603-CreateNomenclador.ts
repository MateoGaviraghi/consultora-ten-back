import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNomenclador1770039722603 implements MigrationInterface {
    name = 'CreateNomenclador1770039722603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nomencladores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(300) NOT NULL, "categoria_id" uuid NOT NULL, "administradora_id" uuid NOT NULL, "codigo_prestacion" character varying(100), "descripcion" text, "porcentaje_aumento_total" numeric(5,2), "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78b73a9b50ef6a94b9586677ec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nomencladores" ADD CONSTRAINT "FK_99d092dd5fc8228dce044448779" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nomencladores" ADD CONSTRAINT "FK_1d3a4ec2809a989818cf94b59b9" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nomencladores" DROP CONSTRAINT "FK_1d3a4ec2809a989818cf94b59b9"`);
        await queryRunner.query(`ALTER TABLE "nomencladores" DROP CONSTRAINT "FK_99d092dd5fc8228dce044448779"`);
        await queryRunner.query(`DROP TABLE "nomencladores"`);
    }

}
