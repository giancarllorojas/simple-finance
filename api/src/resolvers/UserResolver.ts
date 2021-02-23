import { comparePassword, ContextType } from './../utils/auth';
import { getRepository } from 'typeorm';
import { Arg, Authorized, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from '../entity/User';
import { createToken, hashPassword } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

@InputType()
class UserInput{
  @Field()
  email: string

  @Field()
  fullname: string

  @Field()
  password: string
}

@ObjectType()
class AuthState {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User)
  getData(@Ctx() ctx: ContextType) {
    return ctx.user;
  }

  @Mutation(() => AuthState)
  async createUser(@Arg("options", () => UserInput) options: UserInput){
    const hashedPassword = await hashPassword(options.password)

    await getRepository(User).insert({
      ...options,
      password: hashedPassword
    })

    const userData = {
      ...options,
      password: ''
    }

    const token = await createToken(userData)

    return {
      token: token,
      user: userData
    }
  }

  @Mutation(() => AuthState)
  async getUser(@Arg('email') email: string, @Arg('password') password: string){
    const userData = await getRepository(User).findOne(email)

    if(!userData) throw new AuthenticationError('User not found')

    const validPassword = await comparePassword(password, userData?.password as string)
    if(!validPassword) throw new AuthenticationError('Invalid password')

    const token = await createToken(userData)

    return {
      token: token,
      user: {
        ...userData,
        password: ''
      }
    }
  }
}
