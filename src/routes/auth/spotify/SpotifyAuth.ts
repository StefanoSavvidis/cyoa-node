import {v4 as uuid} from 'uuid';
import {URL, URLSearchParams} from 'url';
import {default as asyncRequest} from 'request-promise-native';
import {Response, Request} from 'express';
import {SpotifyAuthResponse} from 'src/types/spotify/auth/SpotifyAuthResponse';
import {SpotifyCurrentUserProfileResponse} from 'src/types/spotify/user/SpotifyCurrentUserProfileResponse';
import {User} from '../../../entity/User';
import {SpotifyAccount} from '../../../entity/SpotifyAccount';

const client_id = 'b87f07ed739b4d848e65e885caa63fa4';
const client_secret = '0f1b3550138c4ff79f864af4950bf21c';
const credentials = Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64',
);
const STATE_KEY = 'spotify_auth_state';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_ME_ENDPOINT = 'https://api.spotify.com/v1/me';

const SPOTIFY_AUTH_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-birthdate',
  'streaming',
];

export const authSpotify = (_request: Request, response: Response) => {
  const spotify_authorize_endpoint = 'https://accounts.spotify.com/authorize';
  const scopes = SPOTIFY_AUTH_SCOPES.join(', ');
  const redirect_uri = 'http://localhost:4000/auth/spotify/callback';

  const url = new URL(spotify_authorize_endpoint);
  const params = new URLSearchParams();
  const state = uuid();

  params.append('client_id', client_id);
  params.append('redirect_uri', redirect_uri);
  params.append('response_type', 'code');
  params.append('scope', scopes);
  params.append('state', state);

  url.search = params.toString();

  response.cookie(STATE_KEY, state);
  response.send(url.toString());
};

export const authSpotifyCallback = async (
  request: Request,
  response: Response,
) => {
  const params = new URLSearchParams();

  const {code, state, error} = request.query;
  if (error) {
    // user did not authorize
    console.log('use did not authorize');
  }
  const storedState = request.cookies[STATE_KEY];

  const redirect_uri = 'http://localhost:4000/auth/spotify/callback';

  if (!storedState || storedState !== state) {
    params.append('error', 'state_mismatch');
  } else {
    response.clearCookie(STATE_KEY);
    const tokenResponse = await requestTokens({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    });

    const {access_token, refresh_token, expires_in} = tokenResponse;

    if (!access_token || !refresh_token || !expires_in) {
      params.append('error', 'invalid token');
    } else {
      params.append('access_token', access_token);
      params.append('refresh_token', refresh_token);
      params.append('expires_in', expires_in.toString());
    }

    const userId: string = request.session!.userId
      ? undefined
      : request.session!.userId;

    const user = await User.findOne(userId);

    if (user && (await user.spotifyAccount) == null) {
      const {id, country, product} = await requestUserData(access_token);

      const currentSpotifyAccount = await SpotifyAccount.create({
        accountLevel: product,
        spotifyId: id,
        country: country,
        accessToken: access_token,
        refreshToken: refresh_token,
      }).save();

      user.spotifyAccount = Promise.resolve(currentSpotifyAccount);

      await user.save();
    }
  }

  response.redirect('http://localhost:3000/');
};

async function requestTokens(form: any): Promise<SpotifyAuthResponse> {
  return asyncRequest.post({
    url: SPOTIFY_TOKEN_ENDPOINT,
    headers: {Authorization: `Basic ${credentials}`},
    json: true,
    form,
  });
}

async function requestUserData(
  access_token: string,
): Promise<SpotifyCurrentUserProfileResponse> {
  const response = await asyncRequest.get({
    url: SPOTIFY_ME_ENDPOINT,
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  return JSON.parse(response);
}
