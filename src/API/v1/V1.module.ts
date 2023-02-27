import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
import { UserModule } from 'src/Entities/user/user.module';
import { RoleEnum } from './decorator/roles.decorator';
import { JwtStrategy } from './strategy/jwt.strategy';
import { V1Controller } from './V1.controller';
import { V1Service } from './V1.service';

@Module({
  imports: [
    SocialAccountTypeModule,
    RoleModule,
    SocialAccountModule,
    UserModule,
    TypeOrmModule.forFeature([SocialAccountType, Role, SocialAccount]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [V1Controller],
  providers: [
    V1Service,
    SocialAccountTypeService,
    SocialAccountService,
    RoleService,
    JwtStrategy,
  ],
  exports: [V1Service],
})
export class V1Module implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly socialAccountTypeService: SocialAccountTypeService,
    private readonly socialAccountService: SocialAccountService,
  ) {}
  async onModuleInit() {
    // Populating Roles
    this.roleService.createEntityIfNotExists(
      { name: RoleEnum.Subscriber },
      'name',
    );
    this.roleService.createEntityIfNotExists(
      { name: RoleEnum.Contributor },
      'name',
    );
    this.roleService.createEntityIfNotExists({ name: RoleEnum.Author }, 'name');
    this.roleService.createEntityIfNotExists({ name: RoleEnum.Editor }, 'name');
    this.roleService.createEntityIfNotExists(
      { name: RoleEnum.Administrator },
      'name',
    );

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

    const role = await this.roleService.findAEntity({
      name: RoleEnum.Administrator,
    });
    console.log(role, 'Role');
    const social_account_type = await this.socialAccountTypeService.findAEntity(
      {
        name: 'Google',
      },
    );
    this.socialAccountService.createEntityIfNotExists(
      {
        social_account_unique_user: '107691503500061ddd50715113082367',
        social_account_email: 'rahulsaqya@gmail.com',
        role,
        social_account_type,
      },
      'social_account_unique_user',
    );
  }
}
