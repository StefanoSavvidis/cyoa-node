import {Resolver, Query, Arg, Ctx} from 'type-graphql';
import {
  ArtistSearchResult,
  AlbumSearchResult,
  SongSearchResult,
} from '../../entity/SearchResult';
import spotifyApi from '../../utils/spotifyAPIConfig';
import {MyContext} from '../../types/MyContext';
import {getUserWithSpotifyAccount} from '../helper/UserDetailsHelper';
// import {CreateArtistInput} from './create/CreateArtistInput';

@Resolver()
export class SearchResolver {
  @Query(() => [ArtistSearchResult], {nullable: true})
  async searchArtist(
    @Ctx() ctx: MyContext,
    @Arg('name') name: string,
    @Arg('skip', {nullable: true, defaultValue: 0}) skip: number,
    @Arg('take', {nullable: true, defaultValue: 25})
    take: number,
  ): Promise<ArtistSearchResult[] | null> {
    const user = await getUserWithSpotifyAccount(ctx.req.session!.userId);

    if (!user || !user.spotifyAccount) {
      return null;
    }

    const spotifyAccount = await user.spotifyAccount;
    spotifyApi.setAccessToken(spotifyAccount.accessToken);

    const spotifyResults = await spotifyApi.searchArtists(`${name}*`, {
      market: 'CA',
      limit: take,
      offset: skip,
    });
    const artists = spotifyResults.body.artists;

    if (!artists) {
      return null;
    }

    const artistSearchResults = artists.items.map((artist) => {
      let resultArtist = new ArtistSearchResult();
      resultArtist.image = artist.images[0].url;
      resultArtist.name = artist.name;
      resultArtist.spotifyId = artist.id;
      resultArtist.spotifyUri = artist.uri;

      return resultArtist;
    });

    await spotifyApi.resetCredentials();

    return artistSearchResults;
  }

  @Query(() => [AlbumSearchResult], {nullable: true})
  async searchAlbums(
    @Ctx() ctx: MyContext,
    @Arg('name') name: string,
    @Arg('skip', {nullable: true, defaultValue: 0}) skip: number,
    @Arg('take', {nullable: true, defaultValue: 25})
    take: number,
  ): Promise<AlbumSearchResult[] | null> {
    const user = await getUserWithSpotifyAccount(ctx.req.session!.userId);

    if (!user || !user.spotifyAccount) {
      return null;
    }

    const spotifyAccount = await user.spotifyAccount;
    spotifyApi.setAccessToken(spotifyAccount.accessToken);

    const spotifyResults = await spotifyApi.searchAlbums(`${name}*`, {
      market: 'CA',
      limit: take,
      offset: skip,
    });
    const albums = spotifyResults.body.albums;

    if (!albums) {
      return null;
    }

    const albumSearchResults = albums.items.map((album) => {
      let resultAlbum = new AlbumSearchResult();
      resultAlbum.image = album.images[0].url;
      resultAlbum.name = album.name;
      resultAlbum.spotifyId = album.id;
      resultAlbum.spotifyUri = album.uri;

      return resultAlbum;
    });

    await spotifyApi.resetCredentials();

    return albumSearchResults;
  }

  @Query(() => [SongSearchResult], {nullable: true})
  async searchSongs(
    @Ctx() ctx: MyContext,
    @Arg('name') name: string,
    @Arg('skip', {nullable: true, defaultValue: 0}) skip: number,
    @Arg('take', {nullable: true, defaultValue: 25})
    take: number,
  ): Promise<SongSearchResult[] | null> {
    const user = await getUserWithSpotifyAccount(ctx.req.session!.userId);

    if (!user || !user.spotifyAccount) {
      return null;
    }

    const spotifyAccount = await user.spotifyAccount;
    spotifyApi.setAccessToken(spotifyAccount.accessToken);

    const spotifyResults = await spotifyApi.searchTracks(`${name}*`, {
      market: 'CA',
      limit: take,
      offset: skip,
    });
    const songs = spotifyResults.body.tracks;

    if (!songs) {
      return null;
    }

    const songSearchResults = songs.items.map((song) => {
      let resultSong = new SongSearchResult();
      resultSong.image = song.album.images[0].url;
      resultSong.name = song.name;
      resultSong.spotifyId = song.id;
      resultSong.spotifyUri = song.uri;

      return resultSong;
    });

    await spotifyApi.resetCredentials();

    return songSearchResults;
  }
}
