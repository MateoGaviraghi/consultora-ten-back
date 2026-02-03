import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { RolUsuario } from '../../../common/enums/rol-usuario.enum';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsEnum(RolUsuario, { message: 'Rol inválido' })
  rol: RolUsuario;

  @IsOptional()
  @IsUUID('4', { message: 'El ID de administradora debe ser un UUID válido' })
  @ValidateIf((o) => o.rol === RolUsuario.ADMIN)
  administradoraId?: string;
}
