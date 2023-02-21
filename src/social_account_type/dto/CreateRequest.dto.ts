import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Url } from 'url';

export class CreateRequestDto {
  @ApiProperty({
    description: 'Logo for the social account login',
    example:
      'https://fastly.picsum.photos/id/505/200/200.jpg?hmac=c295sjTIAZ_9Gj-PENrzAbATNIiWPL1dmhIhWndYnyo',
  })
  @IsUrl()
  @IsOptional()
  logo: Url;

  @ApiProperty({
    description: 'Title to be shown in the account type',
    example: 'Continue with google',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Name to represent account type',
    example: 'Google',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
