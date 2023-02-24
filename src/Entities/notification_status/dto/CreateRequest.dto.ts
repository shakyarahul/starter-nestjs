import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/Entities/user/User.entity';

export class CreateRequestDto {
  @ApiProperty({
    description: 'User to represent role',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user: User;

  @ApiProperty({
    description: 'Category Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  change_category_status: boolean;

  @ApiProperty({
    description: 'Roadmap Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  change_roadmap_status: boolean;

  @ApiProperty({
    description: 'Comment Roadmap Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comment_on_your_roadmap: boolean;

  @ApiProperty({
    description: 'Comment on commented roadmap Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comment_on_your_commented_roadmap: boolean;

  @ApiProperty({
    description: 'comment roadmap link Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comment_on_your_roadmap_link: boolean;

  @ApiProperty({
    description: 'comment on commented roadmap link Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  comment_on_your_commented_roadmap_link: boolean;

  @ApiProperty({
    description: 'interest category Status to represent role',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  when_added_new_roadmap_on_your_interested_category: boolean;
}
