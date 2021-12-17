import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as anecdoteReducer from '../reducers/anecdoteReducer'
import * as notificationReducer from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        /** Sort the anacdoates */
        const compare = (p) => {
          return (m, n) => {
            let a = m[p]
            let b = n[p]
            return b - a
          }
        }
        return state.anecdotes.sort(compare("votes"))
    })
    
    const dispatch = useDispatch()
    
    const vote = (id, content) => {
        content = `You voted '${content}'`
        dispatch(notificationReducer.addNotification(content))
        dispatch(anecdoteReducer.addVote(id))
        setTimeout(() => dispatch(notificationReducer.removeNotification()), 1000 * 5)
    }
    
    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export {AnecdoteList}