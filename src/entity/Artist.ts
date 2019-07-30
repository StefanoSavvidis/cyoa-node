import {ObjectType, Field, ID, Root} from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import {AlbumArtist} from './AlbumArtist';
import {ArtistSong} from './ArtistSong';

@ObjectType()
@Entity()
export class Artist extends BaseEntity {
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
  spotifyId: string;

  @Field()
  spotifyUri(@Root() parent: Artist): string {
    return `spotify:artist:${parent.spotifyId}`;
  }

  @OneToMany(() => AlbumArtist, (aa) => aa.artist)
  albumConnection: Promise<AlbumArtist[]>;

  @OneToMany(() => ArtistSong, (as) => as.artist)
  songConnection: Promise<ArtistSong[]>;
}
