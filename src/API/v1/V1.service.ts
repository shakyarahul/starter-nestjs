import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly role: RoleService,
    private jwtService: JwtService,
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
    } else {
      const role = await this.role.findAEntity({ name: 'Subscriber' });
      // If not then create new user with the provided information
      const data: CreateRequestDto = {
        ...createDto,
        social_account_type: createDto.social_account_type,
        role: role,
      };
      user = await this.social_account.create(data);
      if (user) {
        // If the user is successfully created the return the profile of the user
        user = await this.get_profile(createDto);
      }
    }
    const payload = {
      name: user.social_account_email,
      sub: user.id,
      roles: [user.role.name],
    };

    return { ...user, access_token: this.jwtService.sign(payload) };
  }
}
