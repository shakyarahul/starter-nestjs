import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { NotificationStatus } from 'src/Entities/notification_status/NotificationStatus.entity';

export class ListResponseDto {
  @ApiProperty({
    description: 'Array of NotificationStatus type',
    example: [],
  })
  @IsArray()
  data: Array<NotificationStatus>;

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
