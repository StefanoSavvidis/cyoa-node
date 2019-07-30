import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {Album} from './Album';
import {Song} from './Song';

@Entity()
export class AlbumSong extends BaseEntity {
  @PrimaryColumn()
  albumId: number;

  @PrimaryColumn()
  songId: number;

  @ManyToOne(() => Album, (album) => album.songConnection, {primary: true})
  @JoinColumn({name: 'albumId'})
  album: Promise<Album>;

  @ManyToOne(() => Song, (song) => song.albumConnection, {
    primary: true,
  })
  @JoinColumn({name: 'songId'})
  song: Promise<Song>;
}
