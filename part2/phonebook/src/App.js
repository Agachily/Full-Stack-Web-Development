import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: "Arto Hellas", number: '040-123456' },
    { name: "Ada Lovelace", number: '39-44-5323523' },
    { name: "Dan Abramov", number: '12-43-234345' },
    { name: "Mary Poppendieck", number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState("")

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
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

  const personToShow = (newSearch === "") 
                       ? persons 
                       : persons.filter(value => value.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newSearch} onChange={handleNewSearch}/>
      </div>
      <h2>add a new</h2>
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
        {personToShow.map(value => 
          <Person key={value.name} person={value}/>
        )}
      </div>
    </div>
  )
}

export default App