import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCertificadosDiscapacidadTable1770387807031 implements MigrationInterface {
    name = 'CreateCertificadosDiscapacidadTable1770387807031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificados_discapacidad" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroCertificado" character varying(100) NOT NULL, "fechaEmision" date NOT NULL, "fechaVencimiento" date, "grado" character varying(50) NOT NULL, "observaciones" text, "activo" boolean NOT NULL DEFAULT true, "afiliadoId" uuid NOT NULL, "tipoDiscapacidadId" uuid NOT NULL, "administradoraId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a1f36dad88fa50877f719ec5fac" UNIQUE ("numeroCertificado"), CONSTRAINT "PK_b1ded12ceb4c3b2601374c71bb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" ADD CONSTRAINT "FK_857bd453fba1652334efce826b0" FOREIGN KEY ("afiliadoId") REFERENCES "afiliados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" ADD CONSTRAINT "FK_04859e434ac4bd3854c4b8254a8" FOREIGN KEY ("tipoDiscapacidadId") REFERENCES "tipo_discapacidad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" ADD CONSTRAINT "FK_1460251e2672f6070823d4fcf19" FOREIGN KEY ("administradoraId") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" DROP CONSTRAINT "FK_1460251e2672f6070823d4fcf19"`);
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" DROP CONSTRAINT "FK_04859e434ac4bd3854c4b8254a8"`);
        await queryRunner.query(`ALTER TABLE "certificados_discapacidad" DROP CONSTRAINT "FK_857bd453fba1652334efce826b0"`);
        await queryRunner.query(`DROP TABLE "certificados_discapacidad"`);
    }

}
