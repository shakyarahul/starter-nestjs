import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { User } from '../User.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of User type',
    example: [],
  })
  @IsArray()
  data: Array<User>;

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
