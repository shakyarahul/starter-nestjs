import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Link } from 'src/Entities/link/Link.entity';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
import { User } from 'src/Entities/user/User.entity';

export class CreateRequestDto {
  @ApiProperty({
    description: 'User to represent comment',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: User;

  @ApiProperty({
    description: 'Roadmap that represent comment',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  roadmap: Roadmap;

  @ApiProperty({
    description: 'Link to represent comment',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  link: Link;

  @ApiProperty({
    description: 'Comments to represent comment',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
