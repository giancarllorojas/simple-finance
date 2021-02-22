import { User } from "./types";

export type AuthAction = {
  type: 'SIGNIN' | 'SIGNOFF',
  payload?: {
    token: string,
    user: User
  }
}

export const signIn = (token: string, user: User): AuthAction => ({
  type: "SIGNIN",
  payload: {
    token: token,
    user: user
  },
});

export const signOut = (): AuthAction => ({
  type: "SIGNOFF"
});