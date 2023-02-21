import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roadmap } from '../entity/livedb/roadmap.entity';

@Entity('Structure')
export class Structure {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', {
    nullable: false,
    default: 'Structure',
    length: 255,
    name: 'name',
  })
  name!: string;

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

  @OneToMany(() => Roadmap, (roadmap) => roadmap.structure)
  roadmaps!: Roadmap[];
}
