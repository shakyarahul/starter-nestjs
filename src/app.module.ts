import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role/Role.entity';
import { SocialAccountType } from './social_account_type/social_account_type.entity';
import { SocialAccount } from './social_account/SocialAccount.entity';
import { User } from './user/User.entity';
import { Notification_Status } from './entity/livedb/notification_status.entity';
import { Category } from './category/Category.entity';
import { Roadmap } from './entity/livedb/roadmap.entity';
import { Link } from './entity/livedb/link.entity';
import { Structure } from './structure/Structure.entity';
import { Comment } from './entity/livedb/comment.entity';
import { UserModule } from './user/user.module';
import { NotificationStatusModule } from './notification_status/notification_status.module';
import { StructureModule } from './structure/Structure.module';
import { StatusModule } from './status/status.module';
import { SocialAccountModule } from './social_account/SocialAccount.module';
import { SocialAccountTypeModule } from './social_account_type/social_account_type.module';
import { RoleModule } from './role/Role.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { LinkModule } from './link/link.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { Status } from './status/Status.entity';
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
        Notification_Status,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
