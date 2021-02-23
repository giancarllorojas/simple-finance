import { AuthAction } from "./actions";
import { AuthState } from "./types";

const initialState: AuthState = {
  loggedIn: false
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch(action.type){
    case 'SIGNIN':
      localStorage.setItem('token', action.payload?.token as string)

      return {...state, loggedIn: true, token: action.payload?.token, user: action.payload?.user}
    case 'SIGNOFF':
      localStorage.setItem('token', '')
      
      return initialState
    default:
      return state
  }
}