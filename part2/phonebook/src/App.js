import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    let flag = false

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
   
    persons.forEach(value => {if(value.name === newName){flag = true}})
    
    if (!flag){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }else{
      alert(newName + ' is already added to phonebook')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(value => 
          <Person key={value.name} person={value}/>
        )}
      </div>
    </div>
  )
}

export default App