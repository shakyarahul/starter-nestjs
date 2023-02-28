import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    description: 'Data',
    example: 'Javascript',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Data',
    example: 'Lorem Lore LoreLore Lore',
  })
  @IsString()
  @IsOptional()
  description: string;
}
