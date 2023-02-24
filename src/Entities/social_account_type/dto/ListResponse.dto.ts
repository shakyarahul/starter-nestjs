import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of social account type',
    example: [
      {
        id: 1,
        logo: '',
        name: 'Continue with google',
        title: 'Google',
        updated_at: '2023-02-19T23:28:05.000Z',
        created_at: '2023-02-19T23:28:05.000Z',
      },
    ],
  })
  @IsArray()
  data: Array<SocialAccountType>;

  @ApiProperty({
    description: 'Meta data of the data array',
    example: {
      count: 4,
    },
  })
  @IsObject()
  meta_data: object;
}
