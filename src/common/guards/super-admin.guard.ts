import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RolUsuario } from '../enums/rol-usuario.enum';

/**
 * Guard que valida que el usuario sea SUPERADMIN
 * Uso: @UseGuards(SuperAdminGuard)
 */
@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    return user.rol === RolUsuario.SUPERADMIN;
  }
}
