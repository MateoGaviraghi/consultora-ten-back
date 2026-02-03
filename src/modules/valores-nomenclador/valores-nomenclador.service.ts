import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThanOrEqual } from 'typeorm';
import { ValorNomenclador } from './entities/valor-nomenclador.entity';
import { CreateValorNomencladorDto } from './dto/create-valor-nomenclador.dto';
import { UpdateValorNomencladorDto } from './dto/update-valor-nomenclador.dto';
import { Nomenclador } from '../nomencladores/entities/nomenclador.entity';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';

@Injectable()
export class ValoresNomencladorService {
  constructor(
    @InjectRepository(ValorNomenclador)
    private readonly valorNomencladorRepository: Repository<ValorNomenclador>,
    @InjectRepository(Nomenclador)
    private readonly nomencladorRepository: Repository<Nomenclador>,
  ) {}

  async create(
    createValorNomencladorDto: CreateValorNomencladorDto,
  ): Promise<ValorNomenclador> {
    const valorNomenclador = this.valorNomencladorRepository.create(
      createValorNomencladorDto,
    );
    return await this.valorNomencladorRepository.save(valorNomenclador);
  }

  async findAll(user?: any): Promise<ValorNomenclador[]> {
    // Si es admin, necesitamos filtrar por nomencladores de su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      const nomencladores = await this.nomencladorRepository.find({
        where: { administradoraId: user.administradoraId, activo: true },
        select: ['id'],
      });
      const nomencladorIds = nomencladores.map((n) => n.id);

      if (nomencladorIds.length === 0) {
        return [];
      }

      return await this.valorNomencladorRepository
        .createQueryBuilder('valor')
        .where('valor.nomencladorId IN (:...ids)', { ids: nomencladorIds })
        .andWhere('valor.deletedAt IS NULL')
        .orderBy('valor.fechaVigencia', 'DESC')
        .getMany();
    }

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

  async findByNomenclador(
    nomencladorId: string,
    user?: any,
  ): Promise<ValorNomenclador[]> {
    // Validar permisos del nomenclador
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      const nomenclador = await this.nomencladorRepository.findOne({
        where: { id: nomencladorId },
      });

      if (
        !nomenclador ||
        nomenclador.administradoraId !== user.administradoraId
      ) {
        throw new ForbiddenException(
          'No tienes permisos para ver los valores de este nomenclador',
        );
      }
    }

    return await this.valorNomencladorRepository.find({
      where: { nomencladorId, deletedAt: IsNull() },
      order: { fechaVigencia: 'DESC' },
    });
  }

  async findByEtapa(etapa: string, user?: any): Promise<ValorNomenclador[]> {
    // Si es admin, filtrar por nomencladores de su obra social
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      const nomencladores = await this.nomencladorRepository.find({
        where: { administradoraId: user.administradoraId, activo: true },
        select: ['id'],
      });
      const nomencladorIds = nomencladores.map((n) => n.id);

      if (nomencladorIds.length === 0) {
        return [];
      }

      return await this.valorNomencladorRepository
        .createQueryBuilder('valor')
        .where('valor.nomencladorId IN (:...ids)', { ids: nomencladorIds })
        .andWhere('valor.etapa = :etapa', { etapa })
        .andWhere('valor.deletedAt IS NULL')
        .orderBy('valor.fechaVigencia', 'DESC')
        .getMany();
    }

    return await this.valorNomencladorRepository.find({
      where: { etapa: etapa as any, deletedAt: IsNull() },
      order: { fechaVigencia: 'DESC' },
    });
  }

  async findVigenteByNomenclador(
    nomencladorId: string,
    fecha?: string,
    user?: any,
  ): Promise<ValorNomenclador> {
    // Validar permisos del nomenclador
    if (user && user.rol === RolUsuario.ADMIN && user.administradoraId) {
      const nomenclador = await this.nomencladorRepository.findOne({
        where: { id: nomencladorId },
      });

      if (
        !nomenclador ||
        nomenclador.administradoraId !== user.administradoraId
      ) {
        throw new ForbiddenException(
          'No tienes permisos para ver los valores de este nomenclador',
        );
      }
    }

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
