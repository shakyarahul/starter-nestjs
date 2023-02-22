import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Url } from 'url';
import { CreateRequestDto } from './CreateRequest.dto';

export class UpdateRequestDto extends CreateRequestDto {
  @ApiProperty({
    description: 'primary key of the entity',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
