import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Link } from 'src/Entities/link/Link.entity';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
export class RequestDto {
  @ApiProperty({
    description: 'Comments',
    example: 'Hello',
  })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Roadmap',
    example: 1,
  })
  @IsNumber()
  roadmap: Roadmap;

  @ApiProperty({
    description: 'Link',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  link: Link;
}
