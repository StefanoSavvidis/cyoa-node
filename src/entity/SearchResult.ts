import {ObjectType, Field} from 'type-graphql';

@ObjectType()
export class ArtistSearchResult {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  spotifyId: string;

  @Field()
  spotifyUri: string;
}

@ObjectType()
export class AlbumSearchResult {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  spotifyId: string;

  @Field()
  spotifyUri: string;
}

@ObjectType()
export class SongSearchResult {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  duration: number;

  @Field()
  spotifyId: string;

  @Field()
  spotifyUri: string;
}
