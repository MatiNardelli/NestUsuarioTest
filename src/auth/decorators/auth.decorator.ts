import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { validRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRolesGuard } from '../guards/user-roles/user-roles.guard';

export function Auth(...roles: validRoles[]) {

  return applyDecorators(   //aca no se pone el arroba para decoradores
    RoleProtected(validRoles.admin,validRoles.superUser),
    //reemplazada por la de arriba
    // SetMetadata('roles', roles),
    UseGuards(AuthGuard(), UserRolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}