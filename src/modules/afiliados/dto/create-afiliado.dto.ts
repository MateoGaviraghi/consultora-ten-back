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
  MaxLength,
} from 'class-validator';

export class CreateAfiliadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
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
  @MaxLength(10)
  @IsOptional()
  sexo?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  telefono?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  celular?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  localidad?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  provincia?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  codigoPostal?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  numeroAfiliado?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  plan?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID('4', { message: 'El ID de administradora debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de administradora es requerido' })
  administradoraId: string;

  @IsUUID('4', { message: 'El ID de estado civil debe ser un UUID válido' })
  @IsOptional()
  estadoCivilId?: string;
}
