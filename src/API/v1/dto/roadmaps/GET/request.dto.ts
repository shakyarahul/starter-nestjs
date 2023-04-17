import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../../../../../Entities/category/Category.entity';
import { SortByEnum } from '../../categories/GET/request.dto';

export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsString()
  @IsOptional()
  page: string;
  @ApiProperty({
    description: 'Keyword',
    example: 'Javascript',
  })
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiProperty({
    description: 'Page Size',
    example: 10,
  })
  @IsString()
  @IsOptional()
  page_size: string;

  @ApiProperty({
    description: 'Sort_by',
    example: 'popularity',
  })
  @IsEnum(SortByEnum)
  @IsOptional()
  sort_by: SortByEnum;

  @ApiProperty({
    description: 'Category',
    example: 1,
  })
  @IsString()
  @IsOptional()
  category: Category;
}
