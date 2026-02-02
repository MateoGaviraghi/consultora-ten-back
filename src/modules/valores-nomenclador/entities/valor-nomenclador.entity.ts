import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nomenclador } from '../../nomencladores/entities/nomenclador.entity';

export enum EtapaValor {
  VIGENTE = 'vigente',
  ETAPA_1 = 'etapa1',
  ETAPA_2 = 'etapa2',
  ETAPA_3 = 'etapa3',
}

@Entity('valores_nomenclador')
export class ValorNomenclador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nomenclador_id', type: 'uuid' })
  nomencladorId: string;

  @ManyToOne(() => Nomenclador, { eager: true })
  @JoinColumn({ name: 'nomenclador_id' })
  nomenclador: Nomenclador;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ name: 'fecha_vigencia', type: 'date' })
  fechaVigencia: Date;

  @Column({
    type: 'enum',
    enum: EtapaValor,
    default: EtapaValor.VIGENTE,
  })
  etapa: EtapaValor;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
