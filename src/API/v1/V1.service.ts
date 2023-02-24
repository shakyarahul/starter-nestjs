import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/Entities/role/Role.service';
import { CreateRequestDto } from 'src/Entities/social_account/dto/CreateRequest.dto';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
import { SocialAccountTypeService } from 'src/Entities/social_account_type/SocialAccountType.service';
import { RequestDto } from './dto/continue_with/POST/request.dto';

@Injectable()
export class V1Service {
  constructor(
    private readonly social_account_type: SocialAccountTypeService,
    private readonly social_account: SocialAccountService,
  ) {}

  async get_continue_with() {
    return this.social_account_type.findAll();
  }

  async get_profile(createDto) {
    let user = await this.social_account.findAUser(
      createDto.social_account_email,
      createDto.social_account_unique_user,
      createDto.socialAccountTypeId,
    );
    return user;
  }
  async post_continue_with(createDto: RequestDto) {
    // Check if the user exist with provided email, socialAccountUniqueId and socialAccountTypeId
    let user = await this.get_profile(createDto);
    if (user) {
      // If it exists the return that user
      return user;
    } else {
      // If not then create new user with the provided information
      const data: CreateRequestDto = {
        ...createDto,
        social_account_type: createDto.socialAccountTypeId,
        role: null,
      };
      user = await this.social_account.create(data);
      if (user) {
        // If the user is successfully created the return the profile of the user
        user = await this.get_profile(createDto);
      }
    }

    return user;
  }
}
