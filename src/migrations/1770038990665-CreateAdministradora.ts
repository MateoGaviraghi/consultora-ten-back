import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdministradora1770038990665 implements MigrationInterface {
  name = 'CreateAdministradora1770038990665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "administradoras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(200) NOT NULL, "codigo" character varying(50), "descripcion" text, "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a818645d399e3e79280cca59674" UNIQUE ("codigo"), CONSTRAINT "PK_64e8e1cef50de6ddc9370d9cf1d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "administradoras"`);
  }
}
