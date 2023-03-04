import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Comment } from 'src/Entities/comment/Comment.entity';

export class ResponseDto {
  @ApiProperty({
    description: 'Data',
    example: [],
  })
  @IsObject()
  data: Array<Comment>;

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
