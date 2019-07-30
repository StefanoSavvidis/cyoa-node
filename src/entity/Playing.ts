import {ObjectType, Field, ID} from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import {Song} from './Song';
import {User} from './User';

@ObjectType()
@Entity()
export class Playing extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  position: number;

  @ManyToOne(() => Song, (s) => s.playings)
  song: Promise<Song>;

  @OneToOne(() => User, (u) => u.playing)
  user: Promise<User>;
}
