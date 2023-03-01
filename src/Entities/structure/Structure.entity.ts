import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../commons/common.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';

@Entity('structure')
export class Structure extends CommonEntity {
  @Column('varchar', {
    nullable: false,
    default: 'Structure',
    length: 255,
    name: 'name',
  })
  name!: string;

  @OneToMany(() => Roadmap, (roadmap) => roadmap.links)
  links!: Roadmap[];
}
