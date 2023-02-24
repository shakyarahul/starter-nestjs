import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/Entities/role/Role.entity';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';

export class RequestDto {
  @ApiProperty({
    description: 'Unique Id to represent the user of the social login',
    example: '10769150350006150715113082367',
  })
  @IsString()
  @IsNotEmpty()
  social_account_unique_user: string;

  @ApiProperty({
    description: 'Email Id of the social login',
    example: 'rahulsaqya@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  social_account_email: string;

  @ApiProperty({
    description: 'Social login account type id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  social_account_type: SocialAccountType;

  @ApiProperty({
    description: 'Social account role type id',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  role: Role;

  @ApiProperty({
    description: 'First name of the created account',
    example: 1,
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the created account',
    example: 1,
  })
  @IsString()
  @IsOptional()
  last_name: string;
}
