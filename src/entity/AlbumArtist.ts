import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {Album} from './Album';
import {Artist} from './Artist';

@Entity()
export class AlbumArtist extends BaseEntity {
  @PrimaryColumn()
  albumId: number;

  @PrimaryColumn()
  artistId: number;

  @ManyToOne(() => Album, (album) => album.artistConnection, {primary: true})
  @JoinColumn({name: 'albumId'})
  album: Promise<Album>;

  @ManyToOne(() => Artist, (artist) => artist.albumConnection, {
    primary: true,
  })
  @JoinColumn({name: 'artistId'})
  artist: Promise<Artist>;
}
