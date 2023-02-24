import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './Entities/role/Role.entity';
import { SocialAccountType } from './Entities/social_account_type/SocialAccountType.entity';
import { SocialAccount } from './Entities/social_account/SocialAccount.entity';
import { User } from './Entities/user/User.entity';
import { NotificationStatus } from './Entities/notification_status/NotificationStatus.entity';
import { Category } from './Entities/category/Category.entity';
import { Roadmap } from './Entities/roadmap/Roadmap.entity';
import { Link } from './Entities/link/Link.entity';
import { Structure } from './Entities/structure/Structure.entity';
import { Comment } from './Entities/comment/Comment.entity';
import { UserModule } from './Entities/user/user.module';
import { NotificationStatusModule } from './Entities/notification_status/NotificationStatus.module';
import { StructureModule } from './Entities/structure/Structure.module';
import { StatusModule } from './Entities/status/status.module';
import { SocialAccountModule } from './Entities/social_account/SocialAccount.module';
import { SocialAccountTypeModule } from './Entities/social_account_type/SocialAccountType.module';
import { RoleModule } from './Entities/role/Role.module';
import { RoadmapModule } from './Entities/roadmap/roadmap.module';
import { LinkModule } from './Entities/link/Link.module';
import { CommentModule } from './Entities/comment/comment.module';
import { CategoryModule } from './Entities/category/category.module';
import { Status } from './Entities/status/Status.entity';
import { V1Module } from './API/v1/V1.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '23.106.126.205',
      port: 3306,
      username: 'rahulshakya1_waxy',
      password: '(J@?6Dt],C]F',
      database: 'rahulshakya1_waxy',
      entities: [
        Role,
        SocialAccountType,
        SocialAccount,
        User,
        NotificationStatus,
        Status,
        Category,
        Roadmap,
        Link,
        Structure,
        Comment,
      ],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    CommentModule,
    LinkModule,
    RoadmapModule,
    RoleModule,
    SocialAccountTypeModule,
    SocialAccountModule,
    StatusModule,
    StructureModule,
    NotificationStatusModule,
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
