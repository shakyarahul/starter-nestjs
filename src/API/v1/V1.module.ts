import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/Entities/role/Role.entity';
import { RoleModule } from 'src/Entities/role/Role.module';
import { RoleService } from 'src/Entities/role/Role.service';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { SocialAccountModule } from 'src/Entities/social_account/SocialAccount.module';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';
import { SocialAccountTypeModule } from 'src/Entities/social_account_type/SocialAccountType.module';
import { SocialAccountTypeService } from 'src/Entities/social_account_type/SocialAccountType.service';
import { V1Controller } from './V1.controller';
import { V1Service } from './V1.service';

@Module({
  imports: [
    SocialAccountTypeModule,
    RoleModule,
    SocialAccountModule,
    TypeOrmModule.forFeature([SocialAccountType, Role, SocialAccount]),
  ],
  controllers: [V1Controller],
  providers: [
    V1Service,
    SocialAccountTypeService,
    SocialAccountService,
    RoleService,
  ],
})
export class V1Module implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly socialAccountTypeService: SocialAccountTypeService,
  ) {}
  async onModuleInit() {
    // Populating Roles
    this.roleService.createEntityIfNotExists({ name: 'Subscriber' }, 'name');
    this.roleService.createEntityIfNotExists({ name: 'Contributor' }, 'name');
    this.roleService.createEntityIfNotExists({ name: 'Author' }, 'name');
    this.roleService.createEntityIfNotExists({ name: 'Editor' }, 'name');
    this.roleService.createEntityIfNotExists({ name: 'Administrator' }, 'name');

    // Populating Social Accounts
    this.socialAccountTypeService.createEntityIfNotExists(
      {
        name: 'Google',
        title: 'Login with Google',
      },
      'name',
    );
    this.socialAccountTypeService.createEntityIfNotExists(
      {
        name: 'Apple',
        title: 'Login with Apple',
      },
      'name',
    );
  }
}
