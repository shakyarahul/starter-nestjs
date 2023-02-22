import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Link } from 'src/link/Link.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of Link type',
    example: [],
  })
  @IsArray()
  data: Array<Link>;

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
