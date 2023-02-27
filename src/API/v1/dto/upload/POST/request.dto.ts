import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUrl } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    description: 'Data',
    example: 'https://asdfadsf.com/asdfdas.jpg',
  })
  @IsUrl()
  file: string;
}
