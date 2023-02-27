import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { Category } from '../../category/Category.entity';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Email of the social user',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Profile Image of the social user',
    example: 'https:///adsfadsf.com/adsfdasf.jpg',
  })
  @IsUrl()
  @IsOptional()
  profile_url!: string;

  @ApiProperty({
    description: 'First name of the social user',
    example: 'Rahul',
  })
  @IsString()
  @IsOptional()
  first_name!: string;

  @ApiProperty({
    description: 'Last name of the social user',
    example: 'Last',
  })
  @IsString()
  @IsOptional()
  last_name!: string;

  @ApiProperty({
    description: 'Dob name of the social user',
    example: 'Dob',
  })
  @IsDate()
  @IsOptional()
  dob!: Date;

  @ApiProperty({
    description: 'Social account type of the social user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  social!: SocialAccount;

  @ApiProperty({
    description: 'Last name of the social user',
    example: 'Last',
  })
  @IsArray()
  @IsOptional()
  interested_categories!: Array<Category>;
}
