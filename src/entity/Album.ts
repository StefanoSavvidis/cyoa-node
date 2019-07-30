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
import {AlbumArtist} from './AlbumArtist';

@ObjectType()
@Entity()
export class Album extends BaseEntity {
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
  spotifyId: string;

  @Field()
  spotifyUri(@Root() parent: Album): string {
    return `spotify:album:${parent.spotifyId}`;
  }

  @OneToMany(() => AlbumSong, (as) => as.album)
  songConnection: Promise<AlbumSong[]>;

  @OneToMany(() => AlbumArtist, (aa) => aa.album)
  artistConnection: Promise<AlbumArtist[]>;

  // @Field(() => [Song])
  // async authors(@Ctx() {songsLoader}: MyContext): Promise<Song[]> {
  //   return songsLoader.load(this.id);
  // }
}
