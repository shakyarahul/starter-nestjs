import { SetMetadata } from '@nestjs/common';

export enum RoleEnum {
  Administrator = 'Administrator',
  Subscriber = 'Subscriber',
  Contributor = 'Contributor',
  Author = 'Author',
  Editor = 'Editor',
}

export const HasRoles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
