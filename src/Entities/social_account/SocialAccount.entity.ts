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

@Entity('social_account')
export class SocialAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

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

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at!: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at!: Date;

  @OneToOne(() => User)
  user: User;
}
