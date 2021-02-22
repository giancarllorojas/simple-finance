import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { combineReducers, createStore } from 'redux'

export interface RootState {
  auth: AuthState
}

const rootReducer = combineReducers({
  auth: authReducer
})

export default createStore(rootReducer)