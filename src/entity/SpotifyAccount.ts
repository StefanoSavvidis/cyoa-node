import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import {ObjectType, ID, Field, Root} from 'type-graphql';
import {User} from './User';

@ObjectType()
@Entity()
export class SpotifyAccount extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({nullable: true})
  accountLevel: string;

  @Field()
  @Column({nullable: true})
  country: string;

  @Field()
  @Column()
  accessToken: string;

  @Field()
  @Column()
  refreshToken: string;

  @Field()
  @Column({nullable: true})
  spotifyId: string;

  @Field()
  spotifyUri(@Root() parent: SpotifyAccount): string {
    return `spotify:user:${parent.spotifyId}`;
  }

  @OneToOne(() => User, (u) => u.spotifyAccount)
  user: Promise<User>;
}
