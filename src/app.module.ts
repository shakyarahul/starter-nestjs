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
import { UserModule } from './Entities/user/User.module';
import { NotificationStatusModule } from './Entities/notification_status/NotificationStatus.module';
import { StructureModule } from './Entities/structure/Structure.module';
import { StatusModule } from './Entities/status/Status.module';
import { SocialAccountModule } from './Entities/social_account/SocialAccount.module';
import { SocialAccountTypeModule } from './Entities/social_account_type/SocialAccountType.module';
import { RoleModule } from './Entities/role/Role.module';
import { RoadmapModule } from './Entities/roadmap/Roadmap.module';
import { LinkModule } from './Entities/link/Link.module';
import { CommentModule } from './Entities/comment/Comment.module';
import { CategoryModule } from './Entities/category/Category.module';
import { Status } from './Entities/status/Status.entity';
import { V1Module } from './API/v1/V1.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-58.railway.app',
      port: 7213,
      username: 'root',
      password: '93W3n2s76qgs9Uzzh0SX',
      database: 'railway',
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
