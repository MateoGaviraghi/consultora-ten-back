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
import { TipoDiscapacidad } from '../tipo-discapacidad/entities/tipo-discapacidad.entity';
import { Administradora } from '../administradoras/entities/administradora.entity';

@Entity('certificados_discapacidad')
export class CertificadoDiscapacidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  numeroCertificado: string;

  @Column({ type: 'date' })
  fechaEmision: Date;

  @Column({ type: 'date', nullable: true })
  fechaVencimiento: Date;

  @Column({ type: 'varchar', length: 50 })
  grado: string; // Leve, Moderado, Grave, Muy Grave

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

  // Relación con TipoDiscapacidad
  @ManyToOne(() => TipoDiscapacidad, { nullable: false })
  @JoinColumn({ name: 'tipoDiscapacidadId' })
  tipoDiscapacidad: TipoDiscapacidad;

  @Column({ type: 'uuid' })
  tipoDiscapacidadId: string;

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
