import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThanOrEqual } from 'typeorm';
import { ValorNomenclador } from './entities/valor-nomenclador.entity';
import { CreateValorNomencladorDto } from './dto/create-valor-nomenclador.dto';
import { UpdateValorNomencladorDto } from './dto/update-valor-nomenclador.dto';

@Injectable()
export class ValoresNomencladorService {
  constructor(
    @InjectRepository(ValorNomenclador)
    private readonly valorNomencladorRepository: Repository<ValorNomenclador>,
  ) {}

  async create(
    createValorNomencladorDto: CreateValorNomencladorDto,
  ): Promise<ValorNomenclador> {
    const valorNomenclador = this.valorNomencladorRepository.create(
      createValorNomencladorDto,
    );
    return await this.valorNomencladorRepository.save(valorNomenclador);
  }

  async findAll(): Promise<ValorNomenclador[]> {
    return await this.valorNomencladorRepository.find({
      where: { deletedAt: IsNull() },
      order: { fechaVigencia: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ValorNomenclador> {
    const valorNomenclador = await this.valorNomencladorRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!valorNomenclador) {
      throw new NotFoundException(
        `Valor de nomenclador con ID ${id} no encontrado`,
      );
    }

    return valorNomenclador;
  }

  async findByNomenclador(nomencladorId: string): Promise<ValorNomenclador[]> {
    return await this.valorNomencladorRepository.find({
      where: { nomencladorId, deletedAt: IsNull() },
      order: { fechaVigencia: 'DESC' },
    });
  }

  async findByEtapa(etapa: string): Promise<ValorNomenclador[]> {
    return await this.valorNomencladorRepository.find({
      where: { etapa: etapa as any, deletedAt: IsNull() },
      order: { fechaVigencia: 'DESC' },
    });
  }

  async findVigenteByNomenclador(
    nomencladorId: string,
    fecha?: string,
  ): Promise<ValorNomenclador> {
    const fechaConsulta = fecha ? new Date(fecha) : new Date();

    const valorVigente = await this.valorNomencladorRepository.findOne({
      where: {
        nomencladorId,
        deletedAt: IsNull(),
        fechaVigencia: LessThanOrEqual(fechaConsulta),
      },
      order: { fechaVigencia: 'DESC' },
    });

    if (!valorVigente) {
      throw new NotFoundException(
        `No se encontró valor vigente para el nomenclador ${nomencladorId} en la fecha ${fechaConsulta.toISOString().split('T')[0]}`,
      );
    }

    return valorVigente;
  }

  async update(
    id: string,
    updateValorNomencladorDto: UpdateValorNomencladorDto,
  ): Promise<ValorNomenclador> {
    const valorNomenclador = await this.findOne(id);
    Object.assign(valorNomenclador, updateValorNomencladorDto);
    return await this.valorNomencladorRepository.save(valorNomenclador);
  }

  async remove(id: string): Promise<void> {
    const valorNomenclador = await this.findOne(id);
    valorNomenclador.deletedAt = new Date();
    await this.valorNomencladorRepository.save(valorNomenclador);
  }

  async restore(id: string): Promise<ValorNomenclador> {
    const valorNomenclador = await this.valorNomencladorRepository.findOne({
      where: { id },
    });

    if (!valorNomenclador) {
      throw new NotFoundException(
        `Valor de nomenclador con ID ${id} no encontrado`,
      );
    }

    if (!valorNomenclador.deletedAt) {
      throw new BadRequestException(
        `El valor de nomenclador con ID ${id} no está eliminado`,
      );
    }

    valorNomenclador.deletedAt = null;
    return await this.valorNomencladorRepository.save(valorNomenclador);
  }
}
