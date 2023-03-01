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
import { Category } from '../category/Category.entity';
import { Comment } from '../comment/Comment.entity';
import { CommonEntity } from '../commons/common.entity';
import { Link } from '../link/Link.entity';
import { NotificationStatus } from '../notification_status/NotificationStatus.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { SocialAccount } from '../social_account/SocialAccount.entity';

@Entity('user')
export class User extends CommonEntity {
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
  social: SocialAccount;

  @Column('timestamp', {
    nullable: true,
    default: null,
    name: 'dob',
  })
  dob!: Date;

  @ManyToMany(() => Category, (category) => category.interested_users)
  @JoinTable()
  interested_categories!: Array<Category>;

  @OneToOne(
    () => NotificationStatus,
    (notification_status) => notification_status.user,
  )
  @JoinColumn()
  notification: NotificationStatus;

  @OneToMany(() => Category, (category) => category.created_by)
  categories: Category[];

  @OneToMany(() => Roadmap, (roadmap) => roadmap.created_by)
  createdRoadmaps: Roadmap[];

  @OneToMany(() => Comment, (comment) => comment.created_by)
  comments: Comment[];

  @OneToMany(() => Link, (link) => link.created_by)
  links: Link[];
}
