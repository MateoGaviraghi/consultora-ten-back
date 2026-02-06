import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Afiliado } from '../afiliados/entities/afiliado.entity';
import { TercerosVinculado } from '../terceros-vinculado/entities/terceros-vinculado.entity';
import { Administradora } from '../administradoras/entities/administradora.entity';

@Entity('persona_terceros_vinculado')
export class PersonaTercerosVinculado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  tipoRelacion: string; // padre, madre, tutor, cónyuge, hijo/a, hermano/a, otro

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // Relación con Afiliado
  @ManyToOne(() => Afiliado, { nullable: false })
  @JoinColumn({ name: 'afiliadoId' })
  afiliado: Afiliado;

  @Column({ type: 'uuid' })
  afiliadoId: string;

  // Relación con TercerosVinculado
  @ManyToOne(() => TercerosVinculado, { nullable: false })
  @JoinColumn({ name: 'tercerosVinculadoId' })
  tercerosVinculado: TercerosVinculado;

  @Column({ type: 'uuid' })
  tercerosVinculadoId: string;

  // Relación con Administradora (multi-tenancy)
  @ManyToOne(() => Administradora, { nullable: false })
  @JoinColumn({ name: 'administradoraId' })
  administradora: Administradora;

  @Column({ type: 'uuid' })
  administradoraId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
