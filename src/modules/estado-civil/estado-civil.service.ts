import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';

@Injectable()
export class EstadoCivilService {
  constructor(
    @InjectRepository(EstadoCivil)
    private estadoCivilRepository: Repository<EstadoCivil>,
  ) {}

  async create(
    createEstadoCivilDto: CreateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    // Verificar si ya existe un estado civil con el mismo código
    const existing = await this.estadoCivilRepository.findOne({
      where: { codigo: createEstadoCivilDto.codigo },
    });

    if (existing) {
      throw new ConflictException('Ya existe un estado civil con ese código');
    }

    const estadoCivil = this.estadoCivilRepository.create(createEstadoCivilDto);
    return this.estadoCivilRepository.save(estadoCivil);
  }

  async findAll(user?: any): Promise<EstadoCivil[]> {
    const where: any = { activo: true };

    // Si es admin (no superadmin), filtrar por su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      where.administradoraId = user.administradoraId;
    }

    return this.estadoCivilRepository.find({
      where,
      relations: ['administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string, user?: any): Promise<EstadoCivil> {
    const estadoCivil = await this.estadoCivilRepository.findOne({
      where: { id },
      relations: ['administradora'],
    });

    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    // Si es admin (no superadmin), validar que sea de su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (estadoCivil.administradoraId !== user.administradoraId) {
        throw new ForbiddenException(
          'No tienes permisos para ver este estado civil',
        );
      }
    }

    return estadoCivil;
  }

  async findByAdministradora(
    administradoraId: string,
    user?: any,
  ): Promise<EstadoCivil[]> {
    // Si es admin (no superadmin), validar que sea su propia obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (user.administradoraId !== administradoraId) {
        throw new ForbiddenException(
          'No tienes permisos para ver estados civiles de otra administradora',
        );
      }
    }

    return this.estadoCivilRepository.find({
      where: { administradoraId, activo: true },
      relations: ['administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async update(
    id: string,
    updateEstadoCivilDto: UpdateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    const estadoCivil = await this.estadoCivilRepository.findOne({
      where: { id },
    });

    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    // Si se está actualizando el código, verificar que no exista otro
    if (
      updateEstadoCivilDto.codigo &&
      updateEstadoCivilDto.codigo !== estadoCivil.codigo
    ) {
      const existing = await this.estadoCivilRepository.findOne({
        where: { codigo: updateEstadoCivilDto.codigo },
      });

      if (existing) {
        throw new ConflictException('Ya existe un estado civil con ese código');
      }
    }

    Object.assign(estadoCivil, updateEstadoCivilDto);
    return this.estadoCivilRepository.save(estadoCivil);
  }

  async remove(id: string): Promise<void> {
    const estadoCivil = await this.estadoCivilRepository.findOne({
      where: { id },
    });

    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    estadoCivil.activo = false;
    await this.estadoCivilRepository.save(estadoCivil);
  }

  async restore(id: string): Promise<EstadoCivil> {
    const estadoCivil = await this.estadoCivilRepository.findOne({
      where: { id },
    });

    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    estadoCivil.activo = true;
    return this.estadoCivilRepository.save(estadoCivil);
  }
}
