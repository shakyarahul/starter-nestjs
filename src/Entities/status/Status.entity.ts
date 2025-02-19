import { Category } from '../category/Category.entity';
import { Roadmap } from '../../Entities/roadmap/Roadmap.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Link } from '../../Entities/link/Link.entity';
import { CommonEntity } from '../commons/common.entity';

export enum StatusEnum {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}
@Entity('status')
export class Status extends CommonEntity {
  @Column('varchar', { nullable: false, length: 50, name: 'name' })
  name!: StatusEnum;

  @Column('varchar', { nullable: true, length: 50, name: 'color' })
  color!: string;

  @OneToMany(() => Category, (category) => category.status)
  categories: Category[];

  @OneToMany(() => Roadmap, (roadmap) => roadmap.status)
  roadmaps: Roadmap[];

  @OneToMany(() => Link, (link) => link.status)
  links: Link[];
}
