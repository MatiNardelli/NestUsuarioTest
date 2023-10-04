import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';


//todo esto para que nuestro decorador permita el acceso a un endpoint si tiene role as admin
@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[]=this.reflector.get(META_ROLES,context.getHandler())

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if(!user)
      throw new BadRequestException('User not found');

    for (const role of user.roles) {
      
      try {
        if (validRoles.includes(role)){
          return true;
        }
        
      } catch (error) {
        console.log(error);
      }
        
    } 
    
    throw new ForbiddenException(
      `User ${user.fullName} need a valid role:[${validRoles}]`
    )

    return true;
  }
}
