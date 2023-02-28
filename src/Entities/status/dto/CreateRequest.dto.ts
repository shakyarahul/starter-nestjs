import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from '../Status.entity';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Name to represent role',
    example: 'Admin',
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  name: StatusEnum;
}
