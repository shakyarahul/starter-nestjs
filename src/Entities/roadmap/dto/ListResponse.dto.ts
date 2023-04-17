import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Roadmap } from '../../../Entities/roadmap/Roadmap.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of roadmap type',
    example: [],
  })
  @IsArray()
  data: Array<Roadmap>;

  @ApiProperty({
    description: 'Meta data of the data array',
    example: {
      updated_at: new Date(),
      count: 4,
    },
  })
  @IsObject()
  meta_data: object;
}
