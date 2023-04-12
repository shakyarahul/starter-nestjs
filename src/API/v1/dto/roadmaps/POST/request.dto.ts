import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { Category } from 'src/Entities/category/Category.entity';
import { Url } from 'url';

export class RequestDto {
  @ApiProperty({
    description: 'Category',
    example: 1,
  })
  @IsArray()
  category_ids: Array<Category>;

  @ApiProperty({
    description: 'Svg Url',
    example: 'https://asdfadsf.com/asdfdas.jpg',
  })
  // @IsUrl()
  // svg_url: Url;
  @IsString()
  svg_url: string;

  @ApiProperty({
    description: 'Roadmap Title',
    example: 'Javascript',
  })
  // @IsUrl()
  // svg_url: Url;
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Roadmap Subtitle',
    example: 'Great language to begin with',
  })
  // @IsUrl()
  // svg_url: Url;
  @IsString()
  subtitle: string;
}
