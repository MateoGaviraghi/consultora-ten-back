import { RolUsuario } from '../../../common/enums/rol-usuario.enum';

export class AuthResponseDto {
  token: string;
  usuario: {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    rol: RolUsuario;
  };
}
