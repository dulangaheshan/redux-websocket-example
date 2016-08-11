import Immutable, { List, Map } from 'immutable'
import { combineReducers } from 'redux-immutable'
import * as config from '../../common/config'
const { messageTypes } = config

const messages = (state = new List(), action) => {
  if (action.type === messageTypes.messageAdded) {
    return state.push(Immutable.fromJS(action.payload))
  }
  return state
}

const users = (state = new List(), action) => {
  if (action.type === messageTypes.usersRequested) {
    return Immutable.fromJS(action.payload)
  }

  if (action.type === messageTypes.joinRequested) {
    return state.push(Immutable.fromJS(action.payload))
      .sort((user0, user1) => user0.get('name').localeCompare(user1.get('name')))
  }

  if (action.type === messageTypes.userLeft) {
    return state.filter((user) => user.get('id') !== action.payload.id)
  }

  return state
}

const currentUser = (state = new Map(), action) => {
  if (action.type === messageTypes.joinRequested) {
    return Immutable.fromJS(action.payload)
  }
  return state
}

export default combineReducers({
  messages,
  users,
  currentUser
})
