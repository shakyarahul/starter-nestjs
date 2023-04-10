import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../commons/common.entity';
import { Link } from '../link/Link.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { User } from '../user/User.entity';

@Entity('comment')
export class Comment extends CommonEntity {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  created_by!: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.comments)
  @JoinColumn()
  roadmap!: Roadmap;

  @ManyToOne(() => Link, (link) => link.comments, { nullable: true })
  @JoinColumn()
  link!: Link;

  @Column('varchar', {
    nullable: false,
    default: '',
    length: 255,
    name: 'comment',
  })
  comment!: string;
}
