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
import { Comment } from '../comment/Comment.entity';
import { Link } from '../link/Link.entity';
import { Structure } from '../structure/Structure.entity';
import { User } from '../user/User.entity';
import { Status } from 'src/Entities/status/Status.entity';
import { Url } from 'url';
import { CommonEntity } from '../commons/common.entity';
import { Category } from '../category/Category.entity';

@Entity('roadmap')
export class Roadmap extends CommonEntity {
  @Column('varchar', { nullable: false, length: 50, name: 'title' })
  title!: string;

  @Column('varchar', { nullable: true, length: 100, name: 'subtitle' })
  subtitle!: string;

  @ManyToOne(() => User, (user) => user.createdRoadmaps)
  @JoinColumn()
  created_by!: User;

  @ManyToOne(() => Status, (status) => status.roadmaps)
  @JoinColumn()
  status!: Status;

  @Column('varchar', { nullable: true, length: 50, name: 'description' })
  description!: string;

  @Column('text', { nullable: true, default: null, name: 'svg_url' })
  svg_url!: Url;

  @Column('bigint', { nullable: true, default: 0, name: 'views' })
  views!: number;

  @ManyToMany(() => Category, (category) => category.roadmaps)
  @JoinTable()
  categories!: Array<Category>;

  @ManyToMany(() => Link, (link) => link.roadmaps)
  links: Link[];

  @OneToMany(() => Comment, (comment) => comment.roadmap)
  comments: Comment[];
}
