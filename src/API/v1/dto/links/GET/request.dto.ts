import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
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
    description: 'Page Size',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  page_size: number;
}
