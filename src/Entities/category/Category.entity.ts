import { Status } from 'src/Entities/status/Status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url';
import { User } from '../user/User.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 50, name: 'name' })
  name!: string;

  @OneToOne(
    () => User,
    // (user) => user.categories
  )
  @JoinColumn()
  created_by!: User;

  @Column('text', { nullable: true, default: null, name: 'image_url' })
  image_url!: Url;

  @Column('varchar', {
    nullable: true,
    default: null,
    length: 255,
    name: 'description',
  })
  description!: string;

  @ManyToOne(() => Status, (status) => status.categories)
  @JoinColumn()
  status: Status;

  @ManyToMany(() => User)
  @JoinColumn()
  interested_users: User[];

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
