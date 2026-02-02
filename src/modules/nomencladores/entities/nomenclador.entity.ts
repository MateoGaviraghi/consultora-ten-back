import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Administradora } from '../../administradoras/entities/administradora.entity';

@Entity('nomencladores')
export class Nomenclador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  nombre: string;

  @Column({ name: 'categoria_id' })
  categoriaId: string;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'administradora_id' })
  administradoraId: string;

  @ManyToOne(() => Administradora)
  @JoinColumn({ name: 'administradora_id' })
  administradora: Administradora;

  @Column({ name: 'codigo_prestacion', length: 100, nullable: true })
  codigoPrestacion: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({
    name: 'porcentaje_aumento_total',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  porcentajeAumentoTotal: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
