import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministradoraDto } from './create-administradora.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAdministradoraDto extends PartialType(
  CreateAdministradoraDto,
) {
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
