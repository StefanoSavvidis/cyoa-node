import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {Artist} from './Artist';
import {Song} from './Song';

@Entity()
export class ArtistSong extends BaseEntity {
  @PrimaryColumn()
  artistId: number;

  @PrimaryColumn()
  songId: number;

  @ManyToOne(() => Artist, (artist) => artist.songConnection, {
    primary: true,
  })
  @JoinColumn({name: 'artistId'})
  artist: Promise<Artist>;

  @ManyToOne(() => Song, (song) => song.artistConnection, {
    primary: true,
  })
  @JoinColumn({name: 'songId'})
  song: Promise<Song>;
}
