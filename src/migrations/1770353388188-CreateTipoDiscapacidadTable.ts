import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTipoDiscapacidadTable1770353388188 implements MigrationInterface {
  name = 'CreateTipoDiscapacidadTable1770353388188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "estado_civil" DROP CONSTRAINT "fk_estado_civil_administradora"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" DROP CONSTRAINT "fk_usuario_administradora"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tipo_discapacidad" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "codigo" character varying(50) NOT NULL, "descripcion" text, "administradora_id" uuid NOT NULL, "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_36e7df05c0066e1275c4816e455" UNIQUE ("codigo"), CONSTRAINT "PK_6fdf1ad611e855828e46876b852" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."usuarios_rol_enum" RENAME TO "usuarios_rol_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."usuarios_rol_enum" AS ENUM('superadmin', 'admin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" TYPE "public"."usuarios_rol_enum" USING "rol"::"text"::"public"."usuarios_rol_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" SET DEFAULT 'user'`,
    );
    await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "tipo_discapacidad" ADD CONSTRAINT "FK_505198bb1b668b20eced6db3a4f" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "estado_civil" ADD CONSTRAINT "FK_1468c06ebd9d9154ba5dd31fb1a" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD CONSTRAINT "FK_7a7d4dbf0983bdf2a5ef82b19af" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" DROP CONSTRAINT "FK_7a7d4dbf0983bdf2a5ef82b19af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "estado_civil" DROP CONSTRAINT "FK_1468c06ebd9d9154ba5dd31fb1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tipo_discapacidad" DROP CONSTRAINT "FK_505198bb1b668b20eced6db3a4f"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."usuarios_rol_enum_old" AS ENUM('admin', 'usuario', 'consultor', 'asistente', 'superadmin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" TYPE "public"."usuarios_rol_enum_old" USING "rol"::"text"::"public"."usuarios_rol_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ALTER COLUMN "rol" SET DEFAULT 'usuario'`,
    );
    await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."usuarios_rol_enum_old" RENAME TO "usuarios_rol_enum"`,
    );
    await queryRunner.query(`DROP TABLE "tipo_discapacidad"`);
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_administradora" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "estado_civil" ADD CONSTRAINT "fk_estado_civil_administradora" FOREIGN KEY ("administradora_id") REFERENCES "administradoras"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
