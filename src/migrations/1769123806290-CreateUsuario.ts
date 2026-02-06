import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsuario1769123806290 implements MigrationInterface {
  name = 'CreateUsuario1769123806290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."usuarios_rol_enum" AS ENUM('admin', 'usuario', 'consultor', 'asistente')`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "rol" "public"."usuarios_rol_enum" NOT NULL DEFAULT 'usuario', "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum"`);
  }
}
