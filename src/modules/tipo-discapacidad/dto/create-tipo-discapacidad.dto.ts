import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateTipoDiscapacidadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El código es requerido' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsUUID('4', { message: 'El ID de administradora debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de administradora es requerido' })
  administradoraId: string;
}
