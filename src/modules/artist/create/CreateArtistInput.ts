import {InputType, Field} from 'type-graphql';

@InputType()
export class CreateArtistInput {
  @Field()
  name: string;

  @Field()
  image: string;
}
