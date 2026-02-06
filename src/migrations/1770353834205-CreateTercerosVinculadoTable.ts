import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTercerosVinculadoTable1770353834205 implements MigrationInterface {
  name = 'CreateTercerosVinculadoTable1770353834205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "terceros_vinculado" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "dni" character varying(20) NOT NULL, "fechaNacimiento" date NOT NULL, "edad" integer, "telefono" character varying(20), "email" character varying(100), "direccion" text, "activo" boolean NOT NULL DEFAULT true, "administradoraId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1d295974eade359a07dea1cb605" UNIQUE ("dni"), CONSTRAINT "PK_316607c879352eac11527e87278" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "terceros_vinculado" ADD CONSTRAINT "FK_7e51cff1f33b2d3b645d2c291cd" FOREIGN KEY ("administradoraId") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "terceros_vinculado" DROP CONSTRAINT "FK_7e51cff1f33b2d3b645d2c291cd"`,
    );
    await queryRunner.query(`DROP TABLE "terceros_vinculado"`);
  }
}
