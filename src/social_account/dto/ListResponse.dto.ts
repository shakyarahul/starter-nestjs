import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { SocialAccount } from '../SocialAccount.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of SocialAccount type',
    example: [],
  })
  @IsArray()
  data: Array<SocialAccount>;

  @ApiProperty({
    description: 'Meta data of the data array',
    example: {
      updated_at: new Date(),
      count: 4,
    },
  })
  @IsObject()
  meta_data: object;
}
