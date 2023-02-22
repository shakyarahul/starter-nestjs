import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Comment } from '../entity/livedb/comment.entity';
import { Notification_Status } from '../entity/livedb/notification_status.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'email' })
  email!: string;

  @Column('text', { nullable: true, default: null, name: 'profile_url' })
  profile_url!: string;

  @Column('varchar', {
    nullable: true,
    default: null,
    length: 50,
    name: 'first_name',
  })
  first_name!: string;

  @Column('varchar', {
    nullable: true,
    default: null,
    length: 50,
    name: 'last_name',
  })
  last_name!: string;

  @OneToOne(() => SocialAccount, (social_account) => social_account.user)
  @JoinColumn()
  social: number;

  @Column('timestamp', {
    nullable: true,
    default: null,
    name: 'dob',
  })
  dob!: Date;

  // @ManyToMany(() => Category)
  // @JoinTable()
  // interested_categories!: Category[];

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

  @OneToOne(
    () => Notification_Status,
    (notification_status) => notification_status.user,
  )
  notification: Notification_Status;

  // @OneToMany(() => Category, (category) => category.created_by)
  // categories: Category[];

  @OneToMany(() => Roadmap, (roadmap) => roadmap.created_by)
  createdRoadmaps: Roadmap[];

  @OneToMany(() => Comment, (comment) => comment.created_by)
  comments: Comment[];
}
