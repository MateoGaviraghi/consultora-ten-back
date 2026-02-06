import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDiscapacidadDto } from './create-tipo-discapacidad.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTipoDiscapacidadDto extends PartialType(
  CreateTipoDiscapacidadDto,
) {
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
