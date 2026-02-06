import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonaTercerosVinculado } from './persona-terceros-vinculado.entity';
import { CreatePersonaTercerosVinculadoDto } from './dto/create-persona-terceros-vinculado.dto';
import { UpdatePersonaTercerosVinculadoDto } from './dto/update-persona-terceros-vinculado.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class PersonaTercerosVinculadoService {
  constructor(
    @InjectRepository(PersonaTercerosVinculado)
    private readonly personaTercerosVinculadoRepository: Repository<PersonaTercerosVinculado>,
  ) {}

  async create(
    createPersonaTercerosVinculadoDto: CreatePersonaTercerosVinculadoDto,
  ): Promise<PersonaTercerosVinculado> {
    const personaTercero = this.personaTercerosVinculadoRepository.create(
      createPersonaTercerosVinculadoDto,
    );
    return await this.personaTercerosVinculadoRepository.save(personaTercero);
  }

  async findAll(user: Usuario): Promise<PersonaTercerosVinculado[]> {
    const queryBuilder = this.personaTercerosVinculadoRepository
      .createQueryBuilder('personaTercero')
      .leftJoinAndSelect('personaTercero.afiliado', 'afiliado')
      .leftJoinAndSelect(
        'personaTercero.tercerosVinculado',
        'tercerosVinculado',
      )
      .leftJoinAndSelect('personaTercero.administradora', 'administradora');

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.where(
        'personaTercero.administradoraId = :administradoraId',
        {
          administradoraId: user.administradoraId,
        },
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string, user: Usuario): Promise<PersonaTercerosVinculado> {
    const queryBuilder = this.personaTercerosVinculadoRepository
      .createQueryBuilder('personaTercero')
      .leftJoinAndSelect('personaTercero.afiliado', 'afiliado')
      .leftJoinAndSelect(
        'personaTercero.tercerosVinculado',
        'tercerosVinculado',
      )
      .leftJoinAndSelect('personaTercero.administradora', 'administradora')
      .where('personaTercero.id = :id', { id });

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.andWhere(
        'personaTercero.administradoraId = :administradoraId',
        {
          administradoraId: user.administradoraId,
        },
      );
    }

    const personaTercero = await queryBuilder.getOne();

    if (!personaTercero) {
      throw new NotFoundException(
        `Relación persona-tercero con ID ${id} no encontrada`,
      );
    }

    return personaTercero;
  }

  async update(
    id: string,
    updatePersonaTercerosVinculadoDto: UpdatePersonaTercerosVinculadoDto,
    user: Usuario,
  ): Promise<PersonaTercerosVinculado> {
    const personaTercero = await this.findOne(id, user);

    Object.assign(personaTercero, updatePersonaTercerosVinculadoDto);

    return await this.personaTercerosVinculadoRepository.save(personaTercero);
  }

  async remove(id: string, user: Usuario): Promise<void> {
    const personaTercero = await this.findOne(id, user);
    await this.personaTercerosVinculadoRepository.remove(personaTercero);
  }
}
