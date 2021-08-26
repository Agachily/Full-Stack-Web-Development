import React, { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Display = ({anecArray, voteArray}) =>{
  const maxIndex = voteArray.indexOf(Math.max(...voteArray))
  return(
    <>
    <div>{anecArray[maxIndex]}</div>
    <div>has {voteArray[maxIndex]} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const update = () => setSelected(parseInt(Math.random() * 7))
  
  const point = Array(7).fill(0)
  const [vote, setVote] = useState(point)
  const voteCount = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <Button onClick = {voteCount} text = 'vote'/>
      <Button onClick = {update} text = 'next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <Display anecArray={anecdotes} voteArray={vote}/>
    </div>
  )
}

export default App