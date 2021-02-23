import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryColumn()
  email: string;

  @Field()
  @Column()
  fullname: string;
  
  @Column()
  password: string;
}
