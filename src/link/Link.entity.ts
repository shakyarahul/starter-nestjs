import { Status } from 'src/status/Status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url';
import { Comment } from '../entity/livedb/comment.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { User } from '../user/User.entity';

@Entity('link')
export class Link {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.links)
  @JoinTable()
  roadmaps!: Roadmap[];

  @ManyToOne(
    () => User,
    //  (user) => user.categories
  )
  @JoinColumn()
  created_by!: User;

  @ManyToOne(() => Status, (status) => status.links)
  @JoinColumn()
  status!: Status;

  @ManyToOne(() => Link, (link) => link.parent_link)
  @JoinColumn()
  parent_link!: Link;

  @Column('varchar', { nullable: false, length: 50, name: 'title' })
  title!: string;

  @Column('varchar', { nullable: false, length: 100, name: 'subtitle' })
  subtitle!: string;

  @Column('text', {
    nullable: true,
    default: null,
    name: 'html',
  })
  html!: string;

  @Column('text', {
    nullable: true,
    default: null,
    name: 'url',
  })
  url!: Url;

  @Column('boolean', {
    nullable: false,
    default: false,
    name: 'open_url_directly',
  })
  open_url_directly!: boolean;

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

  @OneToMany(() => Link, (link) => link.parent_link)
  child_link: Link[];

  @OneToMany(() => Comment, (comment) => comment.link)
  comments: Comment[];
}
