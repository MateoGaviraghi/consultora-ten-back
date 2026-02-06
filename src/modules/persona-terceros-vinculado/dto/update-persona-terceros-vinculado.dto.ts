import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaTercerosVinculadoDto } from './create-persona-terceros-vinculado.dto';

export class UpdatePersonaTercerosVinculadoDto extends PartialType(
  CreatePersonaTercerosVinculadoDto,
) {}
