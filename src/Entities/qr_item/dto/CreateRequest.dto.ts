import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  secret_key!: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'rahul@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  redirect_url!: string;
}
