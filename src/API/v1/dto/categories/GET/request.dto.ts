import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum SortByEnum {
  Popularity = 'populartiy',
  Latest = 'latest',
  Most_Commented = 'most_commented',
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
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({
    description: 'Page Size',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  page_size: number;

  @ApiProperty({
    description: 'Sort_by',
    example: 'popularity',
  })
  @IsEnum(SortByEnum)
  @IsNotEmpty()
  sort_by: SortByEnum;
}
