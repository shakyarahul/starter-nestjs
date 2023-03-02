import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SortByEnum } from '../../categories/GET/request.dto';

export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
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
  @IsOptional()
  sort_by: SortByEnum;
}
