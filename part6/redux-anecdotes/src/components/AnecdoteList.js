import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as reducer from '../reducers/anecdoteReducer'

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
        return state.sort(compare("votes"))
    })
    
    const dispatch = useDispatch()
    
    const vote = (id) => {
        dispatch(reducer.addVote(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export {AnecdoteList}