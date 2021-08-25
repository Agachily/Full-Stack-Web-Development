import React, { useState } from 'react'

// define the dutton component
const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// define the display button
const Display = ({goodNum, neutralNum,badNum}) => {
  // save the variables with the destruction machanism
  return(
    <>
    <h1>statistics</h1>
    <p>good {goodNum}</p>
    <p>neutral {neutralNum}</p>
    <p>bad {badNum}</p>
    <p>all {goodNum + neutralNum + badNum}</p>
    <p>average {(goodNum - badNum) / (goodNum + neutralNum + badNum)}</p>
    <p>positive {(100 * goodNum)/(badNum + neutralNum + goodNum)}%</p>
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