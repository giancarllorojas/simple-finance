import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Context } from 'node:vm'
import { User } from 'src/entity/User'
import { AuthChecker } from 'type-graphql'

const JWT_SECRET = '19E5FCE3FFD21CAD4375A9F7E87EA'

export const hashPassword = async (password: string) : Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const comparePassword = async(password: string, hashedPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, success) => {
      if(err) reject(err)

      resolve(success)
    })
  })
}

export const createToken = (user: User) : Promise<string> => {
  user = {...user, password: ''}
  
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, {expiresIn: '7 days'}, (err, token) => {
      if(err) reject(err)

      resolve(token as string)
    })
  })
}

export const decodeToken = (token: string) : Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, value) => {
      if(err) reject(err)

      resolve(value as User)
    })
  })
}

export interface ContextType extends Context {
  user?: User
}

export const authorizeAuthChecker: AuthChecker<ContextType> = ({context: {user}}) => {
  return !!user;
};