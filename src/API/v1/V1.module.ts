import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/Entities/category/category.module';
import { CategoryService } from 'src/Entities/category/Category.service';
import { CommentModule } from 'src/Entities/comment/comment.module';
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
import { Category } from 'src/Entities/category/Category.entity';

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
    CommentModule,
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
    private readonly roadmapService: RoadmapService,
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
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
        name: 'Google',
        title: 'Login with Google',
      },
      {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
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
        name: 'SvgTabular',
        supported_childs: 3,
        starting_x: 450,
        starting_y: 170,
        height: 60,
      },
      {
        name: 'SvgTabularDown',
        supported_childs: 8,
        starting_x: 217,
        starting_y: 64.5,
        recomended_height: 60,
      },
      {
        name: 'SvgSpider',
        supported_childs: 11,
        starting_x: 650,
        starting_y: 140,
        recomended_height: 75,
      },
      {
        name: 'SvgSpiderLeft',
        supported_childs: 5,
        starting_x: 844.263,
        starting_y: 129,
        recomended_height: 50,
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

    await this.add_default_category(approvedStatus);
    const cate: Category = await this.categoryService.findAEntity({
      name: 'JavaScript',
    });
    await this.add_default_roadmap(approvedStatus, cate);
  }
  async add_default_roadmap(approvedStatus, cate) {
    await this.roadmapService.createEntityIfNotExists(
      {
        id: 1,
        updated_at: '2023-04-06T06:06:03.000Z',
        created_at: '2023-04-06T06:06:03.000Z',
        title: 'Javscript',
        subtitle: 'the best every programming language',
        description:
          'Javascript is the best every programming language for you to begin on',
        svg_url: 'https://rahulshakya.info.np/svg/javascript.svg',
        views: '0',
        status: approvedStatus,
        categories: [cate],
      },
      'title',
    );
  }
  async add_default_category(approvedStatus) {
    await this.categoryService.createEntityIfNotExists(
      {
        id: 1,
        name: 'Nest JS',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        description:
          'NestJS is a Node.js framework for building scalable and modular server-side applications using TypeScript or JavaScript.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 2,
        name: 'JavaScript',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
        description:
          'JavaScript is a dynamic programming language used primarily for creating interactive web pages and applications.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 3,
        name: 'React JS',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description:
          'ReactJS is a popular open-source JavaScript library used for building user interfaces and web applications.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 4,
        name: 'Swift',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg',
        description:
          'Swift is a general-purpose, multi-paradigm programming language developed by Apple for building applications for iOS, macOS, watchOS, and tvOS.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 5,
        name: 'Next JS',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/1/10/Cib-next-js_%28CoreUI_Icons_v1.0.0%29.svg',
        description:
          'Next.js is a popular open-source framework based on React that allows for server-side rendering and provides a robust set of features for building scalable web applications.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 6,
        name: 'CSS3',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg',
        description:
          'CSS3 is the latest version of CSS used for styling web pages, including support for animations, transitions, and flexible layouts.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
    await this.categoryService.createEntityIfNotExists(
      {
        id: 7,
        name: 'Swift',
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg',
        description:
          'Swift is a general-purpose, multi-paradigm programming language developed by Apple for building applications for iOS, macOS, watchOS, and tvOS.',
        updated_at: '2023-02-20T19:51:41.000Z',
        created_at: '2023-02-20T19:51:41.000Z',
        status: approvedStatus,
      },
      'name',
    );
  }
}
