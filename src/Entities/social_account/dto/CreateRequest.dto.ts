import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/Entities/role/Role.entity';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Unique Social User Id',
    example: 'lorem123',
  })
  @IsString()
  @IsNotEmpty()
  social_account_unique_user: string;

  @ApiProperty({
    description: 'Email of the social user',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  social_account_email: string;

  @ApiProperty({
    description: 'Type of the social account',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  social_account_type: SocialAccountType;

  @ApiProperty({
    description: 'Role of the social account',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  role: Role;
}
