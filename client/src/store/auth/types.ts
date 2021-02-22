export interface User {
  name: string,
  email: string
}

export interface AuthState {
  loggedIn: boolean,
  token?: string,
  user?: User
}