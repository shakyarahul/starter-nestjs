import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/User.entity';
import { Role } from '../role/Role.entity';
import { SocialAccountType } from '../social_account_type/SocialAccountType.entity';
import { CommonEntity } from '../commons/common.entity';

@Entity('social_account')
export class SocialAccount extends CommonEntity {
  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'social_account_unique_user',
  })
  social_account_unique_user!: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'social_account_email',
  })
  social_account_email!: string;

  @ManyToOne(() => Role, (role) => role.social_accounts, { nullable: true })
  @JoinColumn()
  role!: Role;

  @ManyToOne(
    () => SocialAccountType,
    (social_account_type) => social_account_type.social_accounts,
  )
  @JoinColumn()
  social_account_type!: SocialAccountType;

  @OneToOne(() => User)
  user: User;
}
