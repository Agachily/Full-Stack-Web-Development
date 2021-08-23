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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return(
    <div>
      <Header name={course}/>
      <Content title1={part1.name} number1={part1.exercises} 
               title2={part2.name} number2={part2.exercises}
               title3={part3.name} number3={part3.exercises}/>
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App
