import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Person = ({personToShow}) => {
  return(
    <div>
    {personToShow.map(value => 
      <div key={value.name}>{value.name} {value.number}</div>
    )}
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNumberChange, handlePersonChange}) => {
  return(
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
  )
}

const Filter = ({newSearch, handleNewSearch}) =>{
  return(
    <div>
        filter shown with <input value={newSearch} onChange={handleNewSearch}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
    },[])

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
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange} 
                  handlePersonChange={handlePersonChange}/>
      <h3>Numbers</h3>
      <Person personToShow={personToShow}/>
    </div>
  )
}

export default App