import { RoleEnum } from 'src/API/v1/decorator/roles.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../commons/common.entity';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('role')
export class Role extends CommonEntity {
  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.Subscriber,
    name: 'name',
  })
  name!: RoleEnum;

  @OneToMany(() => SocialAccount, (social_account) => social_account.role)
  social_accounts!: SocialAccount[];
}
