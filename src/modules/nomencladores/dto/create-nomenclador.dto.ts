import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateNomencladorDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(300, { message: 'El nombre no puede exceder 300 caracteres' })
  nombre: string;

  @IsUUID('4', { message: 'El ID de categoría debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  categoriaId: string;

  @IsUUID('4', { message: 'El ID de administradora debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La administradora es requerida' })
  administradoraId: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'El código de prestación no puede exceder 100 caracteres',
  })
  codigoPrestacion?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'El porcentaje no puede ser negativo' })
  @Max(999.99, { message: 'El porcentaje no puede exceder 999.99' })
  porcentajeAumentoTotal?: number;
}
