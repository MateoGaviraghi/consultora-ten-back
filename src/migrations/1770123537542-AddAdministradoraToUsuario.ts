import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdministradoraToUsuario1770123537542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Commit la transacción actual para poder agregar valores al enum
    await queryRunner.commitTransaction();

    // 2. Agregar nuevos valores al enum FUERA de la transacción
    await queryRunner.query(`
            ALTER TYPE usuarios_rol_enum ADD VALUE IF NOT EXISTS 'superadmin'
        `);
    await queryRunner.query(`
            ALTER TYPE usuarios_rol_enum ADD VALUE IF NOT EXISTS 'user'
        `);

    // 3. Iniciar nueva transacción para el resto
    await queryRunner.startTransaction();

    // 4. Actualizar roles existentes
    // ADMIN -> SUPERADMIN para el usuario actual
    await queryRunner.query(`
            UPDATE usuarios 
            SET rol = 'superadmin' 
            WHERE rol = 'admin'
        `);

    // 5. Agregar columna administradora_id (nullable)
    await queryRunner.query(`
            ALTER TABLE usuarios 
            ADD COLUMN administradora_id UUID NULL
        `);

    // 6. Agregar foreign key a administradoras
    await queryRunner.query(`
            ALTER TABLE usuarios 
            ADD CONSTRAINT fk_usuario_administradora 
            FOREIGN KEY (administradora_id) 
            REFERENCES administradoras(id) 
            ON DELETE SET NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar foreign key
    await queryRunner.query(`
            ALTER TABLE usuarios 
            DROP CONSTRAINT IF EXISTS fk_usuario_administradora
        `);

    // Eliminar columna
    await queryRunner.query(`
            ALTER TABLE usuarios 
            DROP COLUMN IF EXISTS administradora_id
        `);

    // Revertir roles
    await queryRunner.query(`
            UPDATE usuarios 
            SET rol = 'admin' 
            WHERE rol = 'superadmin'
        `);

    // Nota: No se pueden eliminar valores de un enum en PostgreSQL sin recrear el tipo
  }
}
