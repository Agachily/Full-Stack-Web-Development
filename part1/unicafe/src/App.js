import React, { useState } from 'react'

const Button = (props) => {
  // define the dutton component
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  // define the display button
  return(
    <>
    <h1>statistics</h1>
    <p>good {props.goodNum}</p>
    <p>neutral {props.neutralNum}</p>
    <p>bad {props.badNum}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // define event handlers
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Button 
        onClick={addGood}
        text='good'
      />
      <Button 
        onClick={addNeutral}
        text='neutral'
      />
      <Button 
        onClick={addBad}
        text='bad'
      />
      <Display goodNum={good} neutralNum={neutral} badNum={bad}/>
    </div>
  )
}

export default App