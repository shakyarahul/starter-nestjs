import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../commons/common.entity';
import { Link } from '../link/Link.entity';

@Entity('structure')
export class Structure extends CommonEntity {
  @Column('varchar', {
    nullable: false,
    default: 'Structure',
    length: 255,
    name: 'name',
  })
  name!: string;

  @Column('int', {
    nullable: false,
    default: 1,
    name: 'supported_childs',
  })
  supported_childs!: number;

  @Column('double', {
    nullable: false,
    default: 1,
    name: 'starting_x',
  })
  starting_x: number;

  @Column('double', {
    nullable: false,
    default: 1,
    name: 'starting_y',
  })
  starting_y: number;

  @Column('double', {
    nullable: false,
    default: 1,
    name: 'height',
  })
  height: number;

  @OneToMany(() => Link, (link) => link.structure)
  links!: Link[];
}
