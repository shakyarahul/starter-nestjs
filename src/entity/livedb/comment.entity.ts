import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Link } from './link.entity';
import { Roadmap } from './roadmap.entity';
import { User } from '../../user/User.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @ManyToOne(
    () => User,
    // (user) => user.comments
  )
  @JoinColumn()
  created_by: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.comments)
  @JoinColumn()
  roadmap: Roadmap;

  @ManyToOne(() => Link, (link) => link.comments)
  @JoinColumn()
  link: Link;

  @Column('varchar', {
    nullable: false,
    default: '',
    length: 255,
    name: 'comment',
  })
  comment!: string;

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
}
