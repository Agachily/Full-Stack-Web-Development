import React, { useState } from 'react'

// define the dutton component
const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({text, value}) =>{
  return(
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
  )
}

// define the display button
const Statistics = ({goodNum, neutralNum,badNum}) => {
  // save the variables with the destruction machanism
  if((goodNum + neutralNum + badNum) == 0){
    return(
      <>
      <StatisticLine text='No feedback given' value=''/>
      </>
    )
  }
  return(
    <>
    <h1>statistics</h1>
    <table>
    <tr><StatisticLine text='good' value={+goodNum}/></tr>
    <tr><StatisticLine text='neutral' value={neutralNum}/></tr>
    <tr><StatisticLine text='bad' value={badNum}/></tr>
    <tr><StatisticLine text='all' value={goodNum + neutralNum + badNum}/></tr>
    <tr><StatisticLine text='average' value={(goodNum - badNum) / (goodNum + neutralNum + badNum)}/></tr>
    <tr><StatisticLine text='positive' value={(100 * goodNum)/(badNum + neutralNum + goodNum)+"%"}/></tr>
    </table>
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
      <h1>give feedback</h1>
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
      <Statistics goodNum={good} neutralNum={neutral} badNum={bad}/>
    </div>
  )
}

export default App