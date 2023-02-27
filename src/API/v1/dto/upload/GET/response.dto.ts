import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Link } from 'src/Entities/link/Link.entity';
import { User } from 'src/Entities/user/User.entity';

export class ResponseDto {
  @ApiProperty({
    description: 'Data',
    example: [],
  })
  @IsObject()
  data: User;

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
