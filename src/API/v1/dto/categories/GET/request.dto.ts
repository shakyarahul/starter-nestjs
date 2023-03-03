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
  @IsNumber()
  @IsNotEmpty()
  page: number;
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
  @IsNumber()
  @IsOptional()
  page_size: number;

  @ApiProperty({
    description: 'Sort_by',
    example: 'popularity',
  })
  @IsEnum(SortByEnum)
  @IsNotEmpty()
  sort_by: SortByEnum;
}
