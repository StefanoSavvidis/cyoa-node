import {buildSchema} from 'type-graphql';
import {LoginResolver} from '../modules/user/Login';
import {RegisterResolver} from '../modules/user/Register';
import {MeResolver} from '../modules/user/Me';
import {SearchResolver} from '../modules/search/SearchResolver';
import {LogoutResolver} from '../modules/user/Logout';
import {SpotifyResolver} from '../modules/spotify/SpotifyResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      LoginResolver,
      RegisterResolver,
      MeResolver,
      SearchResolver,
      LogoutResolver,
      SpotifyResolver,
    ],
    authChecker: ({context: {req}}) => {
      return !!req.session.userId;
    },
  });
