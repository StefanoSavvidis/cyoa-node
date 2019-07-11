import {Entity, Column, BaseEntity, PrimaryColumn} from 'typeorm';
import {ObjectType, ID, Field} from 'type-graphql';

@ObjectType()
@Entity()
export class SpotifyAccount extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  spotify: string;
}
