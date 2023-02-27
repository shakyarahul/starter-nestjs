import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/Entities/role/Role.service';
import { CreateRequestDto } from 'src/Entities/social_account/dto/CreateRequest.dto';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
import { SocialAccountTypeService } from 'src/Entities/social_account_type/SocialAccountType.service';
import { User } from 'src/Entities/user/User.entity';
import { UserService } from 'src/Entities/user/User.service';
import { RequestDto } from './dto/continue_with/POST/request.dto';

@Injectable()
export class V1Service {
  constructor(
    private readonly social_account_type: SocialAccountTypeService,
    private readonly social_account: SocialAccountService,
    private readonly role: RoleService,
    private jwtService: JwtService,
    private user: UserService,
  ) {}

  async get_continue_with() {
    return this.social_account_type.findAll();
  }

  async get_profile(createDto): Promise<User> {
    return await this.user.findAUser({
      social: {
        social_account_unique_user: createDto.social_account_unique_user,
        social_account_type: createDto.social_account_type,
        social_account_email: createDto.social_account_email,
      },
    });
  }
  async post_continue_with(createDto): Promise<User> {
    // Check if the user exist with provided email, socialAccountUniqueId and socialAccountTypeId
    let userFound: User = await this.get_profile(createDto);
    if (!userFound) {
      const social: SocialAccount = await this.social_account.create(createDto);
      userFound = await this.user.create({
        email: createDto.social_account_email,
        first_name: createDto.first_name,
        last_name: createDto.last_name,
        social: social,
        profile_url: null,
        dob: null,
        interested_categories: [],
      });
      userFound = await this.get_profile({
        social_account_email: userFound.email,
      });
    }

    return userFound;

    // If not then create new user with the provided information and also update first_name and last_name asprovided
    // If the user is successfully created the return the profile of the user
  }
}
