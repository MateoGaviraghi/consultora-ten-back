import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAdministradoraDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
