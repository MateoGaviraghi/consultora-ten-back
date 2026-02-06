import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateCertificadoDiscapacidadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  numeroCertificado: string;

  @IsDateString()
  @IsNotEmpty()
  fechaEmision: string;

  @IsDateString()
  @IsOptional()
  fechaVencimiento?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  grado: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsUUID()
  @IsNotEmpty()
  afiliadoId: string;

  @IsUUID()
  @IsNotEmpty()
  tipoDiscapacidadId: string;

  @IsUUID()
  @IsNotEmpty()
  administradoraId: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
