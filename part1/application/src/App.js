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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return(
    <div>
      <Header name={course.name}/>
      <Content title1={course.parts[0].name} number1={course.parts[0].exercises} 
               title2={course.parts[1].name} number2={course.parts[1].exercises}
               title3={course.parts[2].name} number3={course.parts[2].exercises}/>
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App
