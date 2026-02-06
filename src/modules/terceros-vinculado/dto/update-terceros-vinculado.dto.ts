import { PartialType } from '@nestjs/mapped-types';
import { CreateTercerosVinculadoDto } from './create-terceros-vinculado.dto';

export class UpdateTercerosVinculadoDto extends PartialType(
  CreateTercerosVinculadoDto,
) {}
