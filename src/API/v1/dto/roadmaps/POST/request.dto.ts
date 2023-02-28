import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { Category } from 'src/Entities/category/Category.entity';
import { Url } from 'url';

export class RequestDto {
  @ApiProperty({
    description: 'Category',
    example: 1,
  })
  @IsNumber()
  category_ids: Array<Category>;

  @ApiProperty({
    description: 'Svg Url',
    example: 'https://asdfadsf.com/asdfdas.jpg',
  })
  @IsUrl()
  svg_url: Url;
}
