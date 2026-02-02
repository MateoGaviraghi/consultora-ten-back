import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nomenclador } from './entities/nomenclador.entity';
import { CreateNomencladorDto } from './dto/create-nomenclador.dto';
import { UpdateNomencladorDto } from './dto/update-nomenclador.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { AdministradorasService } from '../administradoras/administradoras.service';

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

  async findAll(): Promise<Nomenclador[]> {
    return this.nomencladorRepository.find({
      where: { activo: true },
      relations: ['categoria', 'administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findByCategoria(categoriaId: string): Promise<Nomenclador[]> {
    return this.nomencladorRepository.find({
      where: { categoriaId, activo: true },
      relations: ['categoria', 'administradora'],
      order: { nombre: 'ASC' },
    });
  }

  async findByAdministradora(administradoraId: string): Promise<Nomenclador[]> {
    return this.nomencladorRepository.find({
      where: { administradoraId, activo: true },
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
