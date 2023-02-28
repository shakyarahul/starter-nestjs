import { Injectable } from '@nestjs/common';
import { Category } from 'src/Entities/category/Category.entity';
import { CategoryService } from 'src/Entities/category/Category.service';
import { NotificationStatus } from 'src/Entities/notification_status/NotificationStatus.entity';
import { NotificationStatusService } from 'src/Entities/notification_status/NotificationStatus.service';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
import { RoadmapService } from 'src/Entities/roadmap/Roadmap.service';
import { Role } from 'src/Entities/role/Role.entity';
import { RoleService } from 'src/Entities/role/Role.service';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';
import { SocialAccountTypeService } from 'src/Entities/social_account_type/SocialAccountType.service';
import { StatusEnum } from 'src/Entities/status/Status.entity';
import { StatusService } from 'src/Entities/status/Status.service';
import { User } from 'src/Entities/user/User.entity';
import { UserService } from 'src/Entities/user/User.service';
import { EntityManager } from 'typeorm';
import { RoleEnum } from './decorator/roles.decorator';

@Injectable()
export class V1Service {
  constructor(
    private readonly social_account_type: SocialAccountTypeService,
    private readonly social_account: SocialAccountService,
    private readonly role: RoleService,
    private user: UserService,
    private category: CategoryService,
    private notificationStatus: NotificationStatusService,
    private status: StatusService,
    private roadmap: RoadmapService,
  ) {}

  async get_continue_with(): Promise<Array<SocialAccountType>> {
    return this.social_account_type.findAll();
  }

  async post_continue_with(createDto): Promise<User> {
    // Check if the user exist with provided email, socialAccountUniqueId and socialAccountTypeId
    let userFound: User = await this.get_profile(createDto);
    if (!userFound) {
      const role: Role = await this.role.findAEntity({
        name: RoleEnum.Subscriber,
      });
      const social: SocialAccount = await this.social_account.create(
        { ...createDto, role },
        false,
      );
      const notification: NotificationStatus =
        await this.notificationStatus.create(
          {
            change_category_status: true,
            change_roadmap_status: true,
            comment_on_your_roadmap: true,
            comment_on_your_commented_roadmap: true,
            comment_on_your_roadmap_link: true,
            comment_on_your_commented_roadmap_link: true,
            when_added_new_roadmap_on_your_interested_category: true,
          },
          false,
        );

      await (
        await this.user.manager()
      ).transaction(async (em: EntityManager) => {
        const socialCreate = await em.save(social);
        const notificationCreate = await em.save(notification);

        userFound = await this.user.create(
          {
            email: createDto.social_account_email,
            first_name: createDto.first_name,
            last_name: createDto.last_name,
            social: socialCreate,
            profile_url: null,
            dob: null,
            interested_categories: [],
            notification: notificationCreate,
          },
          false,
        );
        userFound = await em.save(userFound);
      });
      userFound = await this.get_profile({
        social_account_email: createDto.social_account_email,
      });
    }

    return userFound;

    // If not then create new user with the provided information and also update first_name and last_name asprovided
    // If the user is successfully created the return the profile of the user
  }

  async get_profile(createDto): Promise<User> {
    return await this.user.findAEntity({
      social: {
        social_account_unique_user: createDto.social_account_unique_user,
        social_account_type: createDto.social_account_type,
        social_account_email: createDto.social_account_email,
      },
    });
  }

  async post_profile(dto, user: User): Promise<User> {
    const updatedEntity = await this.user.update({ ...dto, id: user.id });
    return await this.get_profile({
      id: updatedEntity.id,
    });
  }

  async post_upload(file) {
    return file;
  }

  async post_categories(dto, user: User): Promise<Category> {
    const status = await this.status.findAEntity({ name: StatusEnum.Pending });
    const createCat = await this.category.create({
      ...dto,
      status,
      created_by: user.id,
    });
    return createCat;
  }
  async total_categories(
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ): Promise<number> {
    return await this.category.totalRows(dto);
  }
  async get_categories(
    user: User,
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ): Promise<Array<Category>> {
    return await this.category.findMine(user, dto);
  }

  async post_roadmaps(dto, user: User) {
    const status = await this.status.findAEntity({ name: StatusEnum.Pending });
    const createRoadmap = await this.roadmap.create({
      ...dto,
      status,
      created_by: user,
      categories: dto.category_ids,
    });
    return createRoadmap;
  }

  async total_roadmaps(
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ): Promise<number> {
    return await this.roadmap.totalRows(dto);
  }
  async get_roadmaps(
    user: User,
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ): Promise<Array<Roadmap>> {
    return await this.roadmap.findMine(user, dto);
  }
}
