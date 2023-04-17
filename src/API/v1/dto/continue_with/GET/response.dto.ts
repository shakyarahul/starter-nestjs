import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Link } from '../../../../../Entities/link/Link.entity';
import { SocialAccountType } from '../../../../../Entities/social_account_type/SocialAccountType.entity';

export class ResponseDto {
  @ApiProperty({
    description: 'Data',
    example: [],
  })
  @IsArray()
  data: Array<SocialAccountType>;

  @ApiProperty({
    description: 'Meta data of the data ',
    example: {
      updated_at: new Date(),
      count: 4,
    },
  })
  @IsObject()
  meta_data: object;
}
