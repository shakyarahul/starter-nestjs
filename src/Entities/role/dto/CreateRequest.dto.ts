import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/API/v1/decorator/roles.decorator';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Name to represent role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name: RoleEnum;
}
