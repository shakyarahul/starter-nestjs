import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Category } from '../../../../../Entities/category/Category.entity';
import { Link } from '../../../../../Entities/link/Link.entity';
import { Roadmap } from '../../../../../Entities/roadmap/Roadmap.entity';
import { Status } from '../../../../../Entities/status/Status.entity';
import { Structure } from '../../../../../Entities/structure/Structure.entity';
import { User } from '../../../../../Entities/user/User.entity';
import { Url } from 'url';

export class RequestDto {
  @ApiProperty({
    description: 'User',
    example: 1,
  })
  @IsNumber()
  created_by: User;
  @ApiProperty({
    description: 'Status',
    example: 1,
  })
  @IsNumber()
  status: Status;
  @ApiProperty({
    description: 'Link',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parent_link: Link;
  @ApiProperty({
    description: 'Title',
    example: 'tits',
  })
  @IsString()
  title: string;
  @ApiProperty({
    description: 'Subtitle',
    example: 'subs',
  })
  @IsString()
  subtitle: string;
  @ApiProperty({
    description: 'Html',
    example: '<h1>hello</h1>',
  })
  @IsString()
  html: string;
  @ApiProperty({
    description: 'Url',
    example: 'https://udemy.com',
  })
  @IsUrl()
  url: Url;

  @ApiProperty({
    description: 'Structure',
    example: 1,
  })
  @IsNumber()
  structure: Structure;

  @ApiProperty({
    description: 'Roadmaps',
    example: [1],
  })
  @IsArray()
  roadmaps: Array<Roadmap>;

  @ApiProperty({
    description: 'Opens Directly',
    example: false,
  })
  @IsBoolean()
  open_url_directly: boolean;
}
