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

  @OneToMany(() => Link, (link) => link.structure)
  links!: Link[];
}
