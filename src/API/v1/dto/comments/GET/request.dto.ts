import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
export class RequestDto {
  @ApiProperty({
    description: 'Page Number',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    description: 'Page Size',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  page_size: number;
}
