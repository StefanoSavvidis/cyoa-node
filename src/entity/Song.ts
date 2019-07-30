import {ObjectType, Field, ID, Root} from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';
// import {Song} from './Song';
// import {MyContext} from 'src/types/MyContext';
import {AlbumSong} from './AlbumSong';
import {ArtistSong} from './ArtistSong';
import {Playing} from './Playing';

@ObjectType()
@Entity()
export class Song extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  release_date: string;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  spotifyId: string;

  @Field()
  spotifyUri(@Root() parent: Song): string {
    return `spotify:track:${parent.spotifyId}`;
  }

  @OneToMany(() => AlbumSong, (as) => as.song)
  albumConnection: Promise<AlbumSong[]>;

  @OneToMany(() => ArtistSong, (as) => as.song)
  artistConnection: Promise<ArtistSong[]>;

  @OneToMany(() => Playing, (p) => p.song)
  playings: Promise<Playing[]>;

  // @Field(() => [Song])
  // async authors(@Ctx() {songsLoader}: MyContext): Promise<Song[]> {
  //   return songsLoader.load(this.id);
  // }
}
