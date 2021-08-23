import React from 'react'

const Header = (props) => {
  return(
    <>
    {props.name}
    </>
  )
}

const Content = (props) => {
  return(
    <>
    {props.title}{props.number}
    </>
  )
}

const Total = (props) => {
  return(
    <>
    Number fo exercises {props.sum}
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
      <h1><Header name={course}/></h1>
      <p><Content title={part1} number={exercises1}/></p>
      <p><Content title={part2} number={exercises2}/></p>
      <p><Content title={part3} number={exercises3}/></p>
      <p><Total sum={exercises1 + exercises2 + exercises3}/></p>
    </div>
  )
}

export default App
