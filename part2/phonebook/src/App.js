import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    let flag = false

    event.preventDefault()
    const personObject = {
      name: newName
    }
   
    persons.forEach(value => {
      if(value.name === newName){flag = true}
    })
    
    if (!flag){
      setPersons(persons.concat(personObject))
      setNewName('')
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