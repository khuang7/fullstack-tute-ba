import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // you can stack decorators, chaging type for graphql
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

    // need field to expose it to graphql schema
  @Field(() => String)
  @Property({type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() }) // special hook that creates a date everytime we create
  updatedAt = new Date();

  @Field()
  @Property({type: 'text'})
  title!: string;

}