import {Resolver, Mutation, Arg} from 'type-graphql';
import {Artist} from 'src/entity/Artist';
import {CreateArtistInput} from './create/CreateArtistInput';

@Resolver()
export class ArtistResolver {
  @Mutation(() => Artist)
  async createArtist(@Arg('data')
  {
    name,
    image,
  }: CreateArtistInput) {
    return Artist.create({
      name: name,
      image: image,
    }).save();
  }

  // @Query(() => [Artist])
  // async artist() {}
}
