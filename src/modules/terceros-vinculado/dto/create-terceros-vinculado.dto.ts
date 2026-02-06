import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsUUID,
} from 'class-validator';

export class CreateTercerosVinculadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsInt()
  @Min(0)
  @Max(150)
  @IsOptional()
  edad?: number;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID('4', { message: 'El ID de administradora debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de administradora es requerido' })
  administradoraId: string;
}
