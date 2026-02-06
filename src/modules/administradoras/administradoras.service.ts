import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administradora } from './entities/administradora.entity';
import { CreateAdministradoraDto } from './dto/create-administradora.dto';
import { UpdateAdministradoraDto } from './dto/update-administradora.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class AdministradorasService {
  constructor(
    @InjectRepository(Administradora)
    private administradoraRepository: Repository<Administradora>,
  ) {}

  async create(
    createAdministradoraDto: CreateAdministradoraDto,
  ): Promise<Administradora> {
    // Verificar si ya existe una administradora con el mismo código
    if (createAdministradoraDto.codigo) {
      const existingAdministradora =
        await this.administradoraRepository.findOne({
          where: { codigo: createAdministradoraDto.codigo },
        });

      if (existingAdministradora) {
        throw new ConflictException(
          'Ya existe una administradora con ese código',
        );
      }
    }

    const administradora = this.administradoraRepository.create(
      createAdministradoraDto,
    );
    return this.administradoraRepository.save(administradora);
  }

  async findAll(user?: Usuario): Promise<Administradora[]> {
    // Si es admin (no superadmin), solo puede ver su propia obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      const administradora = await this.administradoraRepository.findOne({
        where: { id: user.administradoraId, activo: true },
      });
      return administradora ? [administradora] : [];
    }

    // Superadmin ve todas
    return this.administradoraRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string, user?: Usuario): Promise<Administradora> {
    // Si es admin (no superadmin), validar que sea su propia obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (user.administradoraId !== id) {
        throw new ForbiddenException(
          'No tienes permisos para ver esta administradora',
        );
      }
    }

    const administradora = await this.administradoraRepository.findOne({
      where: { id },
    });

    if (!administradora) {
      throw new NotFoundException(`Administradora con ID ${id} no encontrada`);
    }

    return administradora;
  }

  async update(
    id: string,
    updateAdministradoraDto: UpdateAdministradoraDto,
  ): Promise<Administradora> {
    const administradora = await this.findOne(id);

    // Si se está actualizando el código, verificar que no exista otro con ese código
    if (
      updateAdministradoraDto.codigo &&
      updateAdministradoraDto.codigo !== administradora.codigo
    ) {
      const existingAdministradora =
        await this.administradoraRepository.findOne({
          where: { codigo: updateAdministradoraDto.codigo },
        });

      if (existingAdministradora) {
        throw new ConflictException(
          'Ya existe una administradora con ese código',
        );
      }
    }

    Object.assign(administradora, updateAdministradoraDto);
    return this.administradoraRepository.save(administradora);
  }

  async remove(id: string): Promise<void> {
    const administradora = await this.findOne(id);
    administradora.activo = false;
    await this.administradoraRepository.save(administradora);
  }

  async restore(id: string): Promise<Administradora> {
    const administradora = await this.administradoraRepository.findOne({
      where: { id },
    });

    if (!administradora) {
      throw new NotFoundException(`Administradora con ID ${id} no encontrada`);
    }

    administradora.activo = true;
    return this.administradoraRepository.save(administradora);
  }
}
