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

@Entity('estado_civil')
export class EstadoCivil {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, unique: true })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'administradora_id', type: 'uuid' })
  administradoraId: string;

  @ManyToOne(() => Administradora, { nullable: false })
  @JoinColumn({ name: 'administradora_id' })
  administradora: Administradora;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
