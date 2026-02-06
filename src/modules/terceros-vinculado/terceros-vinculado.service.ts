import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TercerosVinculado } from './entities/terceros-vinculado.entity';
import { CreateTercerosVinculadoDto } from './dto/create-terceros-vinculado.dto';
import { UpdateTercerosVinculadoDto } from './dto/update-terceros-vinculado.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class TercerosVinculadoService {
  constructor(
    @InjectRepository(TercerosVinculado)
    private tercerosVinculadoRepository: Repository<TercerosVinculado>,
  ) {}

  async create(
    createTercerosVinculadoDto: CreateTercerosVinculadoDto,
  ): Promise<TercerosVinculado> {
    const tercero = this.tercerosVinculadoRepository.create(
      createTercerosVinculadoDto,
    );

    return await this.tercerosVinculadoRepository.save(tercero);
  }

  async findAll(user: Usuario): Promise<TercerosVinculado[]> {
    const queryBuilder =
      this.tercerosVinculadoRepository.createQueryBuilder('terceros_vinculado');

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.where(
        'terceros_vinculado.administradoraId = :administradoraId',
        {
          administradoraId: user.administradoraId,
        },
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string, user: Usuario): Promise<TercerosVinculado> {
    const tercero = await this.tercerosVinculadoRepository.findOne({
      where: { id },
    });

    if (!tercero) {
      throw new NotFoundException(
        `Tercero vinculado con ID ${id} no encontrado`,
      );
    }

    if (
      user.rol === RolUsuario.ADMIN &&
      tercero.administradoraId !== user.administradoraId
    ) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este tercero vinculado',
      );
    }

    return tercero;
  }

  async update(
    id: string,
    updateTercerosVinculadoDto: UpdateTercerosVinculadoDto,
    user: Usuario,
  ): Promise<TercerosVinculado> {
    const tercero = await this.findOne(id, user);

    Object.assign(tercero, updateTercerosVinculadoDto);

    return await this.tercerosVinculadoRepository.save(tercero);
  }

  async remove(id: string, user: Usuario): Promise<void> {
    const tercero = await this.findOne(id, user);
    await this.tercerosVinculadoRepository.remove(tercero);
  }
}
