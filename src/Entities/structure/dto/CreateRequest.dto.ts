import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Name to represent structure',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
