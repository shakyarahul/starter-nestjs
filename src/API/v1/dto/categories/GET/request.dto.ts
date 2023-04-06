import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SortByEnum {
  Popularity = 'popularity',
  Latest = 'latest',
  Oldest = 'oldest',
}

export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  sort_by: SortByEnum;
}
