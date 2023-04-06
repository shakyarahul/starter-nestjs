import { Status } from 'src/Entities/status/Status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url';
import { Comment } from '../comment/Comment.entity';
import { CommonEntity } from '../commons/common.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { Structure } from '../structure/Structure.entity';
import { User } from '../user/User.entity';

@Entity('link')
export class Link extends CommonEntity {
  @ManyToMany(() => Roadmap, (roadmap) => roadmap.links)
  @JoinTable()
  roadmaps!: Roadmap[];

  @ManyToOne(() => User, (user) => user.links)
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

  @ManyToOne(() => Structure, (structure) => structure.links)
  structure: Structure;

  @OneToMany(() => Link, (link) => link.parent_link)
  child_link: Link[];

  @OneToMany(() => Comment, (comment) => comment.link)
  comments: Comment[];

  @Column('double', {
    nullable: false,
    default: 10,
    name: 'height',
  })
  height: number;
}
