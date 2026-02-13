import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNomencladoresAndValores1770500000000 implements MigrationInterface {
  name = 'DropNomencladoresAndValores1770500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Primero eliminar tabla valores_nomenclador (tiene FK a nomencladores)
    await queryRunner.query(
      `DROP TABLE IF EXISTS "valores_nomenclador" CASCADE`,
    );

    // Luego eliminar tabla nomencladores
    await queryRunner.query(`DROP TABLE IF EXISTS "nomencladores" CASCADE`);

    // Limpiar registros de migraciones viejas de la tabla migrations
    await queryRunner.query(
      `DELETE FROM "migrations" WHERE "name" LIKE '%Nomenclador%' OR "name" LIKE '%ValorNomenclador%'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No se puede revertir esta migración ya que los módulos fueron eliminados
    console.log('Esta migración no es reversible');
  }
}
