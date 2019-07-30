import {Resolver, Ctx, Mutation} from 'type-graphql';

import {MyContext} from '../../types/MyContext';
import {getUserWithSpotifyAccount} from '../helper/UserDetailsHelper';
import spotifyApi from '../../utils/spotifyAPIConfig';
import {SpotifyAccount} from '../../entity/SpotifyAccount';

@Resolver()
export class SpotifyResolver {
  @Mutation(() => SpotifyAccount, {nullable: true})
  async refreshSpotifyAccessToken(
    @Ctx() ctx: MyContext,
  ): Promise<SpotifyAccount | null> {
    const user = await getUserWithSpotifyAccount(ctx.req.session!.userId);

    if (!user || !user.spotifyAccount) {
      return null;
    }
    const spotifyAccount = await user.spotifyAccount;

    spotifyApi.setClientId('b87f07ed739b4d848e65e885caa63fa4');
    spotifyApi.setClientSecret('0f1b3550138c4ff79f864af4950bf21c');
    spotifyApi.setRefreshToken(spotifyAccount.refreshToken);

    const credentials = await spotifyApi.refreshAccessToken();
    const {access_token} = credentials.body;

    spotifyAccount.accessToken = access_token;
    await spotifyAccount.save();

    spotifyApi.resetCredentials();
    return user.spotifyAccount;
  }
}
