import {User} from '../../entity/User';

async function getUserWithSpotifyAccount(userId: any): Promise<User | null> {
  if (!userId) {
    return null;
  }

  const user = await User.findOne(userId, {
    relations: ['spotifyAccount'],
  });

  if (!user) {
    return null;
  }

  return user;
}

export {getUserWithSpotifyAccount};
