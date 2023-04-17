import { Status } from '../../Entities/status/Status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url';
import { CommonEntity } from '../commons/common.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { User } from '../user/User.entity';

@Entity('category')
export class Category extends CommonEntity {
  @Column('varchar', { nullable: false, length: 50, name: 'name' })
  name!: string;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn()
  created_by!: User;

  @Column('text', { nullable: true, default: null, name: 'image_url' })
  image_url!: Url;

  @Column('text', {
    nullable: true,
    default: null,
    name: 'description',
  })
  description!: string;

  @ManyToOne(() => Status, (status) => status.categories)
  @JoinColumn()
  status: Status;

  @ManyToMany(() => User, (user) => user.interested_categories)
  @JoinTable()
  interested_users: Array<User>;

  @ManyToMany(() => Roadmap, (roadmap) => roadmap.categories)
  roadmaps!: Array<Roadmap>;
}
