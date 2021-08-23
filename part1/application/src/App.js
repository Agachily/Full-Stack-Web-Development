import React from 'react'

const Header = (props) => {
  return(
    <>
    <h1>{props.name}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <>
    <p>{props.title} {props.number}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
    <Part title={props.title1} number={props.number1}/>
    <Part title={props.title2} number={props.number2}/>
    <Part title={props.title3} number={props.number3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <>
    <p>Number fo exercises {props.sum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development '
  const part1 = 'Fundamentals of React '
  const exercises1 = 10
  const part2 = 'Using props to pass data '
  const exercises2 = 7
  const part3 = 'State of a component '
  const exercises3 = 14

  return(
    <div>
      <Header name={course}/>
      <Content title1={part1} number1={exercises1} 
               title2={part2} number2={exercises2}
               title3={part3} number3={exercises3}/>
      <Total sum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
