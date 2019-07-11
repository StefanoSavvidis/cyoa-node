import {Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql';
import {RegisterInput} from './register/RegisterInput';
import bcrypt from 'bcryptjs';
import {User} from '../../entity/User';
import {isAuth} from '../middleware/isAuth';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String, {nullable: true})
  async hello() {
    return 'Hello World';
  }

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
