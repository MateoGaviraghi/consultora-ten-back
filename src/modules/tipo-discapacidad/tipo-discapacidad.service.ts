import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDiscapacidad } from './entities/tipo-discapacidad.entity';
import { CreateTipoDiscapacidadDto } from './dto/create-tipo-discapacidad.dto';
import { UpdateTipoDiscapacidadDto } from './dto/update-tipo-discapacidad.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';

@Injectable()
export class TipoDiscapacidadService {
  constructor(
    @InjectRepository(TipoDiscapacidad)
    private tipoDiscapacidadRepository: Repository<TipoDiscapacidad>,
  ) {}

  async create(
    createTipoDiscapacidadDto: CreateTipoDiscapacidadDto,
  ): Promise<TipoDiscapacidad> {
    const existing = await this.tipoDiscapacidadRepository.findOne({
      where: { codigo: createTipoDiscapacidadDto.codigo },
    });

    if (existing) {
      throw new ConflictException(
        'Ya existe un tipo de discapacidad con ese código',
      );
    }

    const tipoDiscapacidad = this.tipoDiscapacidadRepository.create(
      createTipoDiscapacidadDto,
    );
    return this.tipoDiscapacidadRepository.save(tipoDiscapacidad);
  }

  async findAll(user?: any): Promise<TipoDiscapacidad[]> {
    const where: any = { activo: true };

    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      where.administradoraId = user.administradoraId;
    }

    return this.tipoDiscapacidadRepository.find({
      where,
      relations: ['administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string, user?: any): Promise<TipoDiscapacidad> {
    const tipoDiscapacidad = await this.tipoDiscapacidadRepository.findOne({
      where: { id },
      relations: ['administradora'],
    });

    if (!tipoDiscapacidad) {
      throw new NotFoundException(
        `Tipo de discapacidad con ID ${id} no encontrado`,
      );
    }

    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (tipoDiscapacidad.administradoraId !== user.administradoraId) {
        throw new ForbiddenException(
          'No tienes permisos para ver este tipo de discapacidad',
        );
      }
    }

    return tipoDiscapacidad;
  }

  async findByAdministradora(
    administradoraId: string,
    user?: any,
  ): Promise<TipoDiscapacidad[]> {
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (user.administradoraId !== administradoraId) {
        throw new ForbiddenException(
          'No tienes permisos para ver tipos de discapacidad de otra administradora',
        );
      }
    }

    return this.tipoDiscapacidadRepository.find({
      where: { administradoraId, activo: true },
      relations: ['administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async update(
    id: string,
    updateTipoDiscapacidadDto: UpdateTipoDiscapacidadDto,
  ): Promise<TipoDiscapacidad> {
    const tipoDiscapacidad = await this.tipoDiscapacidadRepository.findOne({
      where: { id },
    });

    if (!tipoDiscapacidad) {
      throw new NotFoundException(
        `Tipo de discapacidad con ID ${id} no encontrado`,
      );
    }

    if (
      updateTipoDiscapacidadDto.codigo &&
      updateTipoDiscapacidadDto.codigo !== tipoDiscapacidad.codigo
    ) {
      const existing = await this.tipoDiscapacidadRepository.findOne({
        where: { codigo: updateTipoDiscapacidadDto.codigo },
      });

      if (existing) {
        throw new ConflictException(
          'Ya existe un tipo de discapacidad con ese código',
        );
      }
    }

    Object.assign(tipoDiscapacidad, updateTipoDiscapacidadDto);
    return this.tipoDiscapacidadRepository.save(tipoDiscapacidad);
  }

  async remove(id: string): Promise<void> {
    const tipoDiscapacidad = await this.tipoDiscapacidadRepository.findOne({
      where: { id },
    });

    if (!tipoDiscapacidad) {
      throw new NotFoundException(
        `Tipo de discapacidad con ID ${id} no encontrado`,
      );
    }

    tipoDiscapacidad.activo = false;
    await this.tipoDiscapacidadRepository.save(tipoDiscapacidad);
  }

  async restore(id: string): Promise<TipoDiscapacidad> {
    const tipoDiscapacidad = await this.tipoDiscapacidadRepository.findOne({
      where: { id },
    });

    if (!tipoDiscapacidad) {
      throw new NotFoundException(
        `Tipo de discapacidad con ID ${id} no encontrado`,
      );
    }

    tipoDiscapacidad.activo = true;
    return this.tipoDiscapacidadRepository.save(tipoDiscapacidad);
  }
}
