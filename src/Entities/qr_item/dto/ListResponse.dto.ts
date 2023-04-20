import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { QRItem } from '../QRItem.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of QRItem type',
    example: [],
  })
  @IsArray()
  data: Array<QRItem>;

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
