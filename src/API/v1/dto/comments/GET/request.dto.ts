import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({
    description: 'Page Size',
    example: 10,
  })
  @IsString()
  @IsOptional()
  page_size: string;
}
