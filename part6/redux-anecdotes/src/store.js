import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools())

export {store}