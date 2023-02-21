import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Url } from 'url';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Name to represent structure',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
