import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { RoleEnum } from '../decorator/roles.decorator';

const rolesMapper = (role) => {
  if (isArray(role)) {
    switch (role[0]) {
      case RoleEnum.Administrator:
        return [
          RoleEnum.Administrator,
          RoleEnum.Editor,
          RoleEnum.Author,
          RoleEnum.Contributor,
          RoleEnum.Subscriber,
        ];
      case RoleEnum.Editor:
        return [
          RoleEnum.Editor,
          RoleEnum.Author,
          RoleEnum.Contributor,
          RoleEnum.Subscriber,
        ];
      case RoleEnum.Author:
        return [RoleEnum.Author, RoleEnum.Contributor, RoleEnum.Subscriber];
      case RoleEnum.Contributor:
        return [RoleEnum.Contributor, RoleEnum.Subscriber];
      case RoleEnum.Subscriber:
        return [RoleEnum.Subscriber];
    }
  } else {
    return [RoleEnum.Subscriber];
  }
};
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('user', user);
    return requiredRoles.some((role) => rolesMapper(user.roles).includes(role));
  }
}
