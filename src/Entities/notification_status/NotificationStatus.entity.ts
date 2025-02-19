import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../commons/common.entity';
import { User } from '../user/User.entity';

@Entity('notification_status')
export class NotificationStatus extends CommonEntity {
  @OneToOne(() => User, (user) => user.notification)
  user: User;

  @Column('boolean', { nullable: false, default: true })
  change_category_status!: boolean;

  @Column('boolean', { nullable: false, default: true })
  change_roadmap_status!: boolean;

  @Column('boolean', { nullable: false, default: true })
  comment_on_your_roadmap!: boolean;

  @Column('boolean', { nullable: false, default: true })
  comment_on_your_commented_roadmap!: boolean;

  @Column('boolean', { nullable: false, default: true })
  comment_on_your_roadmap_link!: boolean;

  @Column('boolean', { nullable: false, default: true })
  comment_on_your_commented_roadmap_link!: boolean;

  @Column('boolean', { nullable: false, default: true })
  when_added_new_roadmap_on_your_interested_category!: boolean;
}
