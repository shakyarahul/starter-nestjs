import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Link } from 'src/link/Link.entity';
import { Status } from 'src/status/Status.entity';
import { User } from 'src/user/User.entity';
import { Url } from 'url';

export class CreateRequestDto {
  @ApiProperty({
    description: 'User that represent Link',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: User;

  @ApiProperty({
    description: 'Status to represent Link',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    description: 'Parent Link to represent Link',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parent_link: Link;

  @ApiProperty({
    description: 'Title to represent Link',
    example: 'Javascript es6',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtitle to represent Link',
    example: 'Javascript es6',
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    description: 'Html to represent Link',
    example: '<html></html>',
  })
  @IsString()
  @IsOptional()
  html: string;

  @ApiProperty({
    description: 'Url to represent Link',
    example: 'https://rahul.com/adfa.html',
  })
  @IsUrl()
  @IsOptional()
  url: Url;

  @ApiProperty({
    description: 'Url to represent Link',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  open_url_directly: boolean;
}
