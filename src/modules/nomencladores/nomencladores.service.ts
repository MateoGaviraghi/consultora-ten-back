import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nomenclador } from './entities/nomenclador.entity';
import { CreateNomencladorDto } from './dto/create-nomenclador.dto';
import { UpdateNomencladorDto } from './dto/update-nomenclador.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { AdministradorasService } from '../administradoras/administradoras.service';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';

@Injectable()
export class NomencladoresService {
  constructor(
    @InjectRepository(Nomenclador)
    private nomencladorRepository: Repository<Nomenclador>,
    private categoriasService: CategoriasService,
    private administradorasService: AdministradorasService,
  ) {}

  async create(
    createNomencladorDto: CreateNomencladorDto,
  ): Promise<Nomenclador> {
    // Validar que existan la categoría y administradora
    await this.categoriasService.findOne(createNomencladorDto.categoriaId);
    await this.administradorasService.findOne(
      createNomencladorDto.administradoraId,
    );

    const nomenclador = this.nomencladorRepository.create(createNomencladorDto);
    return this.nomencladorRepository.save(nomenclador);
  }

  async findAll(user?: any): Promise<Nomenclador[]> {
    const where: any = { activo: true };

    // Si es admin (no superadmin), filtrar por su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      where.administradoraId = user.administradoraId;
    }

    return this.nomencladorRepository.find({
      where,
      relations: ['categoria', 'administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findByCategoria(
    categoriaId: string,
    user?: any,
  ): Promise<Nomenclador[]> {
    const where: any = { categoriaId, activo: true };

    // Si es admin (no superadmin), filtrar por su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      where.administradoraId = user.administradoraId;
    }

    return this.nomencladorRepository.find({
      where,
      relations: ['categoria', 'administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findByAdministradora(
    administradoraId: string,
    user?: any,
  ): Promise<Nomenclador[]> {
    const where: any = { administradoraId, activo: true };

    // Si es admin (no superadmin), validar que sea su propia obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      if (user.administradoraId !== administradoraId) {
        return []; // No tiene permisos para ver otra obra social
      }
    }

    return this.nomencladorRepository.find({
      where,
      relations: ['categoria', 'administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Nomenclador> {
    const nomenclador = await this.nomencladorRepository.findOne({
      where: { id },
      relations: ['categoria', 'administradora'],
    });

    if (!nomenclador) {
      throw new NotFoundException(`Nomenclador con ID ${id} no encontrado`);
    }

    return nomenclador;
  }

  async update(
    id: string,
    updateNomencladorDto: UpdateNomencladorDto,
  ): Promise<Nomenclador> {
    const nomenclador = await this.findOne(id);

    // Validar que existan la categoría y administradora si se están actualizando
    if (updateNomencladorDto.categoriaId) {
      await this.categoriasService.findOne(updateNomencladorDto.categoriaId);
    }

    if (updateNomencladorDto.administradoraId) {
      await this.administradorasService.findOne(
        updateNomencladorDto.administradoraId,
      );
    }

    Object.assign(nomenclador, updateNomencladorDto);
    return this.nomencladorRepository.save(nomenclador);
  }

  async remove(id: string): Promise<void> {
    const nomenclador = await this.findOne(id);
    nomenclador.activo = false;
    await this.nomencladorRepository.save(nomenclador);
  }

  async restore(id: string): Promise<Nomenclador> {
    const nomenclador = await this.nomencladorRepository.findOne({
      where: { id },
      relations: ['categoria', 'administradora'],
    });

    if (!nomenclador) {
      throw new NotFoundException(`Nomenclador con ID ${id} no encontrado`);
    }

    nomenclador.activo = true;
    return this.nomencladorRepository.save(nomenclador);
  }
}
