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
import { EstadoCivil } from '../../estado-civil/entities/estado-civil.entity';

@Entity('afiliados')
export class Afiliado {
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

  @Column({ type: 'varchar', length: 10, nullable: true })
  sexo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  celular: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  localidad: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provincia: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  codigoPostal: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numeroAfiliado: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  plan: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'uuid' })
  administradoraId: string;

  @ManyToOne(() => Administradora)
  @JoinColumn({ name: 'administradoraId' })
  administradora: Administradora;

  @Column({ type: 'uuid', nullable: true })
  estadoCivilId: string;

  @ManyToOne(() => EstadoCivil)
  @JoinColumn({ name: 'estadoCivilId' })
  estadoCivil: EstadoCivil;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
