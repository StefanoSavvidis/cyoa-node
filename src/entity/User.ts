import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {ObjectType, ID, Field, Root} from 'type-graphql';
import {SpotifyAccount} from './SpotifyAccount';
import {Playing} from './Playing';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column('text', {unique: true})
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column('text', {unique: true})
  username: string;

  @OneToOne(() => SpotifyAccount, (sa) => sa.user)
  @JoinColumn()
  spotifyAccount: Promise<SpotifyAccount>;

  @OneToOne(() => Playing, (p) => p.user)
  @JoinColumn()
  playing: Promise<Playing>;
}
