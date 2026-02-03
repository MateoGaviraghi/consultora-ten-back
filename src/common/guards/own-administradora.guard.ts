import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RolUsuario } from '../enums/rol-usuario.enum';

/**
 * Guard que valida que:
 * - SUPERADMIN puede acceder a todo
 * - ADMIN solo puede acceder a recursos de su propia obra social
 *
 * Uso: @UseGuards(OwnAdministradoraGuard)
 *
 * El guard verifica el administradoraId del recurso contra el del usuario
 */
@Injectable()
export class OwnAdministradoraGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // SUPERADMIN puede acceder a todo
    if (user.rol === RolUsuario.SUPERADMIN) {
      return true;
    }

    // Si es ADMIN, debe tener una administradora asignada
    if (user.rol === RolUsuario.ADMIN) {
      if (!user.administradoraId) {
        throw new ForbiddenException('Usuario admin sin obra social asignada');
      }

      // Buscar el administradoraId en diferentes lugares de la request
      const resourceAdminId =
        request.body?.administradoraId ||
        request.params?.administradoraId ||
        request.query?.administradoraId;

      // Si se está creando/modificando un recurso, validar que sea de su obra social
      if (resourceAdminId && resourceAdminId !== user.administradoraId) {
        throw new ForbiddenException(
          'No tienes permisos para acceder a esta obra social',
        );
      }

      return true;
    }

    // Otros roles no tienen acceso por defecto
    throw new ForbiddenException('No tienes permisos suficientes');
  }
}
