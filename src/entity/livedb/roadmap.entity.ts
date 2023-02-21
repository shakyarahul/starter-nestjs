import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Link } from './link.entity';
import { Structure } from '../../structure/Structure.entity';
import { User } from '../../user/User.entity';
import { Status } from 'src/status/Status.entity';

@Entity('roadmap')
export class Roadmap {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 50, name: 'title' })
  title!: string;

  @Column('varchar', { nullable: true, length: 100, name: 'subtitle' })
  subtitle!: string;

  @ManyToOne(
    () => User,
    // (user) => user.createdRoadmaps
  )
  @JoinColumn()
  created_by: User;

  @ManyToOne(() => Status, (status) => status.roadmaps)
  @JoinColumn()
  status: number;

  @Column('varchar', { nullable: true, length: 50, name: 'description' })
  description!: string;

  @Column('text', { nullable: true, default: null, name: 'svg_url' })
  svg_url!: string;

  @Column('bigint', { nullable: true, default: 0, name: 'views' })
  views!: number;

  @ManyToOne(() => Structure, (structure) => structure.roadmaps)
  structure!: Structure;

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

  @ManyToMany(() => Link, (link) => link.roadmaps)
  links: Link[];

  @OneToMany(() => Comment, (comment) => comment.roadmap)
  comments: Comment[];
}
