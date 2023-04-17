import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../../../../../Entities/comment/Comment.entity';
export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({
    description: 'Page Size',
    example: 10,
  })
  @IsString()
  @IsOptional()
  page_size: string;

  @IsString()
  @IsOptional()
  comments_till: Comment;
}
