import { Field, Float, Int, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field(() => Float)
  @Column()
  value: number

  @Field(() => User)
  @ManyToOne(() => User) @JoinColumn() 
  user: User;
}