import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCivilDto } from './create-estado-civil.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEstadoCivilDto extends PartialType(CreateEstadoCivilDto) {
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
