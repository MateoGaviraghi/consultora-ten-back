import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Administradora } from '../../administradoras/entities/administradora.entity';

@Entity('terceros_vinculado')
export class TercerosVinculado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  dni: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'int', nullable: true })
  edad: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'uuid' })
  administradoraId: string;

  @ManyToOne(() => Administradora)
  @JoinColumn({ name: 'administradoraId' })
  administradora: Administradora;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
