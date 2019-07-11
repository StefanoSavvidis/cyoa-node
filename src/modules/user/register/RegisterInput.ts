import {Length, IsEmail} from 'class-validator';
import {Field, InputType} from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 40)
  firstName: string;

  @Field()
  @Length(1, 40)
  lastName: string;

  @Field()
  @Length(1, 40)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
