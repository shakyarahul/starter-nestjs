import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/Category.entity';
import { Comment } from '../comment/Comment.entity';
import { CommonEntity } from '../commons/common.entity';
import { Link } from '../link/Link.entity';
import { NotificationStatus } from '../notification_status/NotificationStatus.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('qrItem')
export class QRItem extends CommonEntity {
  @Column('longtext', { nullable: true })
  redirect_url!: string;

  @Column('varchar', { nullable: false })
  secret_key!: string;
}
