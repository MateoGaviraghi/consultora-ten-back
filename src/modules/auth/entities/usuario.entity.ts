import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolUsuario } from '../../../common/enums/rol-usuario.enum';
import { Administradora } from '../../administradoras/entities/administradora.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.USER,
  })
  rol: RolUsuario;

  @Column({ name: 'administradora_id', type: 'uuid', nullable: true })
  administradoraId: string | null;

  @ManyToOne(() => Administradora, { nullable: true, eager: true })
  @JoinColumn({ name: 'administradora_id' })
  administradora?: Administradora;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
