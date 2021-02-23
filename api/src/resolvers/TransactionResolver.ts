import { Transaction } from './../entity/Transaction';
import { Arg, Authorized, Ctx, Field, Float, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getManager, getRepository } from 'typeorm';
import { ContextType } from '../utils/auth';
import { User } from 'src/entity/User';

@InputType()
class TransactionInput {
  @Field()
  name: string;

  @Field(() => Float)
  value: number;
}

@ObjectType()
class TransactionSummary {
  @Field()
  income: number

  @Field()
  expenses: number
}

@Resolver()
export class TransactionResolver {
  @Authorized()
  @Query(() => TransactionSummary)
  async getUserSummary(@Ctx() ctx: ContextType){
    const user = ctx.user as User

    const {income} = await getRepository(Transaction)
    .createQueryBuilder("t")
    .select("SUM(value) as income")
    .where("t.userEmail = :email and t.value > 0", { email: user.email }).getRawOne()

    const {expenses} = await getRepository(Transaction)
    .createQueryBuilder("t")
    .select("SUM(value) as expenses")
    .where("t.userEmail = :email and t.value < 0", { email: user.email }).getRawOne()

    return {
      income: !!income ? income : 0,
      expenses: !!expenses ? expenses : 0
    }
  }

  @Authorized()
  @Query(() => [Transaction])
  async getUserTransactions(@Ctx() ctx: ContextType){
    const user = ctx.user as User

    const userTransactions = await getRepository(Transaction).find({
      where: {
        user: {
          email: user.email
        }
      }
    })

    console.log(userTransactions)

    return userTransactions
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createTransaction(@Arg("options", () => TransactionInput) options: TransactionInput, @Ctx() ctx: ContextType){
    const t = new Transaction()

    t.name = options.name
    t.value = options.value
    t.user = ctx.user as User
    
    await getManager().save(t)
    return true
  }
}
