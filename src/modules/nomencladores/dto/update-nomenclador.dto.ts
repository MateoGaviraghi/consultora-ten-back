import { PartialType } from '@nestjs/mapped-types';
import { CreateNomencladorDto } from './create-nomenclador.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNomencladorDto extends PartialType(CreateNomencladorDto) {
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
