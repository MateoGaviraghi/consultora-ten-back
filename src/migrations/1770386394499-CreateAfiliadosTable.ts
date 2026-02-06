import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAfiliadosTable1770386394499 implements MigrationInterface {
    name = 'CreateAfiliadosTable1770386394499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "afiliados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "dni" character varying(20) NOT NULL, "fechaNacimiento" date NOT NULL, "edad" integer, "sexo" character varying(10), "email" character varying(100), "telefono" character varying(20), "celular" character varying(20), "direccion" text, "localidad" character varying(100), "provincia" character varying(100), "codigoPostal" character varying(10), "numeroAfiliado" character varying(50), "plan" character varying(50), "activo" boolean NOT NULL DEFAULT true, "administradoraId" uuid NOT NULL, "estadoCivilId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8ca03b3e4fe024397749a12fd9a" UNIQUE ("dni"), CONSTRAINT "PK_cd81929627a66bbe246c94f3210" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD CONSTRAINT "FK_9acb5b36c36e9fb5072921edcd6" FOREIGN KEY ("administradoraId") REFERENCES "administradoras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD CONSTRAINT "FK_98e926c262c084999f4183e7087" FOREIGN KEY ("estadoCivilId") REFERENCES "estado_civil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "afiliados" DROP CONSTRAINT "FK_98e926c262c084999f4183e7087"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP CONSTRAINT "FK_9acb5b36c36e9fb5072921edcd6"`);
        await queryRunner.query(`DROP TABLE "afiliados"`);
    }

}
