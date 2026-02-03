import { SetMetadata } from '@nestjs/common';
import { RolUsuario } from '../enums/rol-usuario.enum';

/**
 * Decorador para especificar roles permitidos en un endpoint
 *
 * Ejemplo:
 * @Roles(RolUsuario.SUPERADMIN)
 * @UseGuards(RolesGuard)
 * async create() { ... }
 */
export const Roles = (...roles: RolUsuario[]) => SetMetadata('roles', roles);
