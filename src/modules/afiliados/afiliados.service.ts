import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { RolUsuario } from '../../common/enums/rol-usuario.enum';
import { Usuario } from '../auth/entities/usuario.entity';

@Injectable()
export class AfiliadosService {
  constructor(
    @InjectRepository(Afiliado)
    private afiliadoRepository: Repository<Afiliado>,
  ) {}

  async create(createAfiliadoDto: CreateAfiliadoDto): Promise<Afiliado> {
    const afiliado = this.afiliadoRepository.create(createAfiliadoDto);
    return await this.afiliadoRepository.save(afiliado);
  }

  async findAll(user: Usuario): Promise<Afiliado[]> {
    const queryBuilder = this.afiliadoRepository.createQueryBuilder('afiliado');

    queryBuilder.leftJoinAndSelect('afiliado.estadoCivil', 'estadoCivil');
    queryBuilder.leftJoinAndSelect('afiliado.administradora', 'administradora');

    if (user.rol === RolUsuario.ADMIN) {
      queryBuilder.where('afiliado.administradoraId = :administradoraId', {
        administradoraId: user.administradoraId,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string, user: Usuario): Promise<Afiliado> {
    const afiliado = await this.afiliadoRepository.findOne({
      where: { id },
      relations: ['estadoCivil', 'administradora'],
    });

    if (!afiliado) {
      throw new NotFoundException(`Afiliado con ID ${id} no encontrado`);
    }

    if (
      user.rol === RolUsuario.ADMIN &&
      afiliado.administradoraId !== user.administradoraId
    ) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este afiliado',
      );
    }

    return afiliado;
  }

  async update(
    id: string,
    updateAfiliadoDto: UpdateAfiliadoDto,
    user: Usuario,
  ): Promise<Afiliado> {
    const afiliado = await this.findOne(id, user);

    Object.assign(afiliado, updateAfiliadoDto);

    return await this.afiliadoRepository.save(afiliado);
  }

  async remove(id: string, user: Usuario): Promise<void> {
    const afiliado = await this.findOne(id, user);
    await this.afiliadoRepository.remove(afiliado);
  }
}
