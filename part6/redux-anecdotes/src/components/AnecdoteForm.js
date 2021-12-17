import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as reducer from '../reducers/anecdoteReducer'
import * as notificationReducer from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        dispatch(reducer.createNote(content))
        let message = `You have create the anacdote '${content}'`
        dispatch(notificationReducer.addNotification(message))
        setTimeout(() => dispatch(notificationReducer.removeNotification()), 1000 * 5)
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addNote}>
            <div><input name="note" /></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

export {AnecdoteForm}