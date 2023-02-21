import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from 'src/user/User.entity';
import { Url } from 'url';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Name to represent category',
    example: 'JavaScript',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Name to represent image_url',
    example: 'https://asdfadsf.com/imag.png',
  })
  @IsUrl()
  @IsOptional()
  image_url: Url;

  @ApiProperty({
    description: 'Name to represent description',
    example: 'Hello',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'User who created category',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: User;
}
