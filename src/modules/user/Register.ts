import {Resolver, Mutation, Arg} from 'type-graphql';
import {RegisterInput} from './register/RegisterInput';
import bcrypt from 'bcryptjs';
import {User} from '../../entity/User';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data')
  {
    email,
    firstName,
    lastName,
    password,
    username,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    }).save();

    return user;
  }
}
