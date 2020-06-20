import {USER_LOGIN, ACTION_USER_LOGIN} from '../actionTypes'
import { bindActionCreators } from 'redux'

export type userNames = 'user' | 'admin'

const initialState: userNames = 'user'

export default function(state: userNames=initialState, action: ACTION_USER_LOGIN) {
  if (action.type === USER_LOGIN && typeof action.payload === 'string' && ['user', 'admin'].includes(action.payload)){
    return action.payload
  }

  else return state
}