import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', {
    nullable: false,
    default: 'user',
    length: 255,
    name: 'name',
  })
  name!: string;

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

  @OneToMany(() => SocialAccount, (social_account) => social_account.role)
  social_accounts!: SocialAccount[];
}
