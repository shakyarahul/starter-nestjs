import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Url } from 'url';
import { CommonEntity } from '../commons/common.entity';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('social_account_type')
export class SocialAccountType extends CommonEntity {
  @ApiProperty({
    description: 'Logo for the social account login',
    example:
      'https://fastly.picsum.photos/id/505/200/200.jpg?hmac=c295sjTIAZ_9Gj-PENrzAbATNIiWPL1dmhIhWndYnyo',
  })
  @Column('text', { nullable: true, default: null, name: 'logo' })
  logo?: Url;

  @ApiProperty({
    description: 'Name to represent account type',
    example: 'Google',
  })
  @Column('varchar', { nullable: false, length: 50, name: 'name' })
  name!: string;

  @ApiProperty({
    description: 'Title to be shown in the account type',
    example: 'Continue with google',
  })
  @Column('varchar', { nullable: false, length: 50, name: 'title' })
  title!: string;

  @OneToMany(
    () => SocialAccount,
    (social_account) => social_account.social_account_type,
  )
  social_accounts: [];
}
