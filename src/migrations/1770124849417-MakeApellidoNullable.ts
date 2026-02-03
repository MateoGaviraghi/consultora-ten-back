import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeApellidoNullable1770124849417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE usuarios 
            DROP COLUMN apellido
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE usuarios 
            ADD COLUMN apellido VARCHAR(100) NOT NULL DEFAULT ''
        `);
  }
}
