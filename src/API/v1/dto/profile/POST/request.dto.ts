import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUrl } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    description: 'Data',
    example: 'https://asdfadsf.com/asdfdas.jpg',
  })
  @IsUrl()
  profile_url: string;

  @ApiProperty({
    description: 'Data',
    example: 'asdfasd',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Data',
    example: 'asdfasd',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Data',
    example: 'asdfasd',
  })
  @IsDate()
  dob: Date;
}
