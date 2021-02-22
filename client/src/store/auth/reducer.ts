import { AuthAction } from "./actions";
import { AuthState } from "./types";

const initialState: AuthState = {
  loggedIn: false
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch(action.type){
    case 'SIGNIN':
      return {...state, loggedIn: true, user: action.payload}
    case 'SIGNOFF':
      return initialState
    default:
      return state
  }
}