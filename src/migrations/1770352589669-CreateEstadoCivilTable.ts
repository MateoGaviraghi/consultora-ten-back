import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEstadoCivilTable1770352589669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estado_civil',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'codigo',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'administradora_id',
            type: 'uuid',
          },
          {
            name: 'activo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Crear foreign key a administradoras
    await queryRunner.createForeignKey(
      'estado_civil',
      new TableForeignKey({
        columnNames: ['administradora_id'],
        referencedTableName: 'administradoras',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        name: 'fk_estado_civil_administradora',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'estado_civil',
      'fk_estado_civil_administradora',
    );
    await queryRunner.dropTable('estado_civil');
  }
}
