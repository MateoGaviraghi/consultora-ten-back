import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificadoDiscapacidad } from './certificado-discapacidad.entity';
import { CreateCertificadoDiscapacidadDto } from './dto/create-certificado-discapacidad.dto';
import { UpdateCertificadoDiscapacidadDto } from './dto/update-certificado-discapacidad.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class CertificadosDiscapacidadService {
  constructor(
    @InjectRepository(CertificadoDiscapacidad)
    private readonly certificadoDiscapacidadRepository: Repository<CertificadoDiscapacidad>,
  ) {}

  async create(
    createCertificadoDiscapacidadDto: CreateCertificadoDiscapacidadDto,
  ): Promise<CertificadoDiscapacidad> {
    const certificado = this.certificadoDiscapacidadRepository.create(
      createCertificadoDiscapacidadDto,
    );
    return await this.certificadoDiscapacidadRepository.save(certificado);
  }

  async findAll(user: Usuario): Promise<CertificadoDiscapacidad[]> {
    const queryBuilder = this.certificadoDiscapacidadRepository
      .createQueryBuilder('certificado')
      .leftJoinAndSelect('certificado.afiliado', 'afiliado')
      .leftJoinAndSelect('certificado.tipoDiscapacidad', 'tipoDiscapacidad')
      .leftJoinAndSelect('certificado.administradora', 'administradora');

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.where('certificado.administradoraId = :administradoraId', {
        administradoraId: user.administradoraId,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string, user: Usuario): Promise<CertificadoDiscapacidad> {
    const queryBuilder = this.certificadoDiscapacidadRepository
      .createQueryBuilder('certificado')
      .leftJoinAndSelect('certificado.afiliado', 'afiliado')
      .leftJoinAndSelect('certificado.tipoDiscapacidad', 'tipoDiscapacidad')
      .leftJoinAndSelect('certificado.administradora', 'administradora')
      .where('certificado.id = :id', { id });

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.andWhere(
        'certificado.administradoraId = :administradoraId',
        {
          administradoraId: user.administradoraId,
        },
      );
    }

    const certificado = await queryBuilder.getOne();

    if (!certificado) {
      throw new NotFoundException(
        `Certificado de discapacidad con ID ${id} no encontrado`,
      );
    }

    return certificado;
  }

  async update(
    id: string,
    updateCertificadoDiscapacidadDto: UpdateCertificadoDiscapacidadDto,
    user: Usuario,
  ): Promise<CertificadoDiscapacidad> {
    const certificado = await this.findOne(id, user);

    Object.assign(certificado, updateCertificadoDiscapacidadDto);

    return await this.certificadoDiscapacidadRepository.save(certificado);
  }

  async remove(id: string, user: Usuario): Promise<void> {
    const certificado = await this.findOne(id, user);
    await this.certificadoDiscapacidadRepository.remove(certificado);
  }
}
