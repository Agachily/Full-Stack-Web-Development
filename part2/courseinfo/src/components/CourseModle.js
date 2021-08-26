import React from 'react'

const Course = ({course}) => {
  const exercise = course.parts.map(course => course.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return(
      <div>
          <h2>{course.name}</h2>
          {course.parts.map(course =>
            <p key={course.id}>
              {course.name} {course.exercises}
            </p> 
          )}
          <p><b>total of {exercise.reduce(reducer)} exercises</b></p>
      </div>
  )
}

export default Course
