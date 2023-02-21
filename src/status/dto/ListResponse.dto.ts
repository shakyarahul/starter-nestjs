import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { Status } from 'src/status/Status.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of Status type',
    example: [
      {
        id: 3,
        name: 'Admin',
        updated_at: '2023-02-20T02:23:08.000Z',
        created_at: '2023-02-20T02:23:08.000Z',
      },
      {
        id: 2,
        name: 'Admin',
        updated_at: '2023-02-20T02:19:49.000Z',
        created_at: '2023-02-20T02:19:49.000Z',
      },
      {
        id: 1,
        name: 'User',
        updated_at: '2023-02-20T02:19:29.000Z',
        created_at: '2023-02-20T02:19:29.000Z',
      },
    ],
  })
  @IsArray()
  data: Array<Status>;

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
