import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePersonaTercerosVinculadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipoRelacion: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsUUID()
  @IsNotEmpty()
  afiliadoId: string;

  @IsUUID()
  @IsNotEmpty()
  tercerosVinculadoId: string;

  @IsUUID()
  @IsNotEmpty()
  administradoraId: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
