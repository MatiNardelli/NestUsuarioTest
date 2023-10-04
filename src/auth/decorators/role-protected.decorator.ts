import { SetMetadata } from '@nestjs/common';
import { validRoles } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: validRoles[]) => {



    return SetMetadata(META_ROLES, args);  //coincide el 'roles' con el de user-roles.guard
}
