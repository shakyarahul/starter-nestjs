import { Category } from '../category/Category.entity';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Link } from 'src/Entities/link/Link.entity';

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 50, name: 'name' })
  name!: string;

  @Column('varchar', { nullable: false, length: 50, name: 'color' })
  color!: string;

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

  @OneToMany(() => Category, (category) => category.status)
  categories: Category[];

  @OneToMany(() => Roadmap, (roadmap) => roadmap.status)
  roadmaps: Roadmap[];

  @OneToMany(() => Link, (link) => link.status)
  links: Link[];
}
