import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Status } from 'src/Entities/status/Status.entity';
import { User } from 'src/Entities/user/User.entity';
import { Url } from 'url';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Title to represent roadmap',
    example: 'JavaScript',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Subtitle to represent roadmap',
    example: 'Best programming language ever',
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    description: 'User that represent roadmap',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: User;

  @ApiProperty({
    description: 'Status that represent roadmap',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    description: 'Description to represent roadmap',
    example: 'Try this',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Svg to represent roadmap',
    example: 'https://adsfasdfdsa/adsfdas.svg',
  })
  @IsUrl()
  svg_url: Url;

  @ApiProperty({
    description: 'Svg to represent roadmap',
    example: 'https://adsfasdfdsa/adsfdas.svg',
  })
  @IsNumber()
  views: number;
}
