import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/Entities/category/category.module';
import { CategoryService } from 'src/Entities/category/Category.service';
import { LinkModule } from 'src/Entities/link/Link.module';
import { NotificationStatusModule } from 'src/Entities/notification_status/NotificationStatus.module';
import { RoadmapModule } from 'src/Entities/roadmap/roadmap.module';
import { RoadmapService } from 'src/Entities/roadmap/Roadmap.service';
import { Role } from 'src/Entities/role/Role.entity';
import { RoleModule } from 'src/Entities/role/Role.module';
import { RoleService } from 'src/Entities/role/Role.service';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { SocialAccountModule } from 'src/Entities/social_account/SocialAccount.module';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';
import { SocialAccountTypeModule } from 'src/Entities/social_account_type/SocialAccountType.module';
import { SocialAccountTypeService } from 'src/Entities/social_account_type/SocialAccountType.service';
import { StatusEnum } from 'src/Entities/status/Status.entity';
import { StatusModule } from 'src/Entities/status/status.module';
import { StatusService } from 'src/Entities/status/Status.service';
import { StructureModule } from 'src/Entities/structure/Structure.module';
import { StructureService } from 'src/Entities/structure/Structure.service';
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
    RoadmapModule,
    TypeOrmModule.forFeature([SocialAccountType, Role, SocialAccount]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    NotificationStatusModule,
    CategoryModule,
    StatusModule,
    LinkModule,
    StructureModule,
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
    private readonly v1Service: V1Service,
    private readonly statusService: StatusService,
    private readonly categoryService: CategoryService,
    private readonly structureService: StructureService,
  ) {}
  async onModuleInit() {
    // Populating Roles
    await [
      { name: RoleEnum.Subscriber },
      { name: RoleEnum.Contributor },
      { name: RoleEnum.Author },
      { name: RoleEnum.Editor },
      { name: RoleEnum.Administrator },
    ].map(
      async (v) => await this.roleService.createEntityIfNotExists(v, 'name'),
    );
    // Populating Social Accounts
    await [
      {
        name: 'Google',
        title: 'Login with Google',
      },
      {
        name: 'Apple',
        title: 'Login with Apple',
      },
    ].map(
      async (v) =>
        await this.socialAccountTypeService.createEntityIfNotExists(v, 'name'),
    );
    // Populating Status
    await [
      {
        name: StatusEnum.Approved,
      },
      {
        name: StatusEnum.Pending,
      },
      {
        name: StatusEnum.Rejected,
      },
    ].map(
      async (v) => await this.statusService.createEntityIfNotExists(v, 'name'),
    );

    // Populating Structure

    await [
      {
        name: 'General - One Child',
        supported_childs: 1,
      },
      {
        name: 'General - Two Child',
        supported_childs: 2,
      },
      {
        name: 'General - Three Child',
        supported_childs: 3,
      },
    ].map(
      async (v) =>
        await this.structureService.createEntityIfNotExists(v, 'name'),
    );
    const approvedStatus = await this.statusService.createEntityIfNotExists(
      {
        name: StatusEnum.Approved,
      },
      'name',
    );
    const role_admin = await this.roleService.findAEntity({
      name: RoleEnum.Administrator,
    });
    const social_account_type_google =
      await this.socialAccountTypeService.findAEntity({
        name: 'Google',
      });
    const admin = await this.v1Service.post_continue_with({
      social_account_unique_user: '107691503500061ddd50715113082367',
      social_account_email: 'rahulsaqya@gmail.com',
      role: role_admin,
      social_account_type: social_account_type_google,
      first_name: 'Rahul',
      last_name: 'Saqya',
    });

    await this.categoryService.createEntityIfNotExists(
      {
        name: 'JavaScript',
        description:
          'JavaScript is a dynamic computer programming language. It is lightweight and most commonly used as a part of web pages, whose implementations allow client-side script to interact with the user and make dynamic pages. It is an interpreted programming language with object-oriented capabilities.',
        status: approvedStatus,
        created_by: admin,
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png',
      },
      'name',
    );
  }
}
