import axios from 'axios'
import React, { useEffect, useState } from 'react'
import phoneBookService from './services/phoneBook'

// 用于展示电话簿中的信息并进行相应的操作
const Person = ({personToShow, setPersons}) => {
  // 用于从电话簿中删除联系人
  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      phoneBookService.deleteData(person.id).then(setPersons(personToShow.filter(item => item.id !== person.id)))
    }
  }

  return(
    <div>
    {personToShow.map(value => 
      <div key={value.name}>{value.name} {value.number} <button onClick={() => handleDelete(value)}>delete</button><p/></div> 
    )}
    </div>
  )
}

 // 当姓名和电话号码发生变化时，展示相关信息 
const ShowMessage = ({nameMessage, numberMessage}) => {
  if (nameMessage === null && numberMessage === null){
    return null
  }else if(nameMessage === null && numberMessage != null){ 
    return( <div className="info">{numberMessage}</div>)
  }else if(nameMessage != null && numberMessage === null){
    return( <div className="info">{nameMessage}</div>)
  }else{
    return(
      <div>
        <div className="info">{numberMessage}</div>
        <div className="info">{nameMessage}</div>
      </div>
    )
  }
}

const PersonForm = ({addPerson, newName, newNumber, handleNumberChange, handlePersonChange}) => {
  return(
    <form onSubmit={addPerson}>
          <div>Name: <input value={newName} onChange={handlePersonChange}/></div><p/>
          <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div><p/>
          <button type="submit">add</button>
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
  const [ nameMessage, setNameMessage] = useState(null)
  const [ numberMessage, setNumberMessage] = useState(null)

  // 从服务器端获取数据，注意，只有开启了json-server后才可以从服务器端获取数据。
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
    },[])

  // 当新增联系人时，用于对它的姓名进行设置
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // 当新增联系人时，用于对他的电话号码进行设置
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // 当用于搜索的字符串发生更改时进行相应的处理
  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  // 用于增加新的联系人
  const addPerson = (event) => {
    let flag = false
    let updateID = 0
    let repeatPerson = "" 

    event.preventDefault()

    // 用于构建新的联系人对象
    const personObject = {
      name: newName,
      number: newNumber
    }

    //判断联系人是否已经存在，如果不存在，则向persons数组和服务器中添加该联系人，如果存在，则提示相关信息
    persons.forEach(value => {if(value.name.toLowerCase() === newName.toLocaleLowerCase()){
      flag = true
      updateID = value.id
      repeatPerson = value.name
    }})
    if (!flag){
      // 将新的联系人对象添加到服务器端的数据中，并添加到persons数组中。
      phoneBookService.sendData(personObject).then(response => setPersons(persons.concat(response.data)))
      //显示已经添加联系人的信息
      setNameMessage(`Added ${newName}`)
      setTimeout(() => {
        setNameMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }else{
      // 如果联系人已经存在，则对电话号码进行更新
      if (window.confirm(`${repeatPerson} is already added to phonebook, replace the old number with a new one ?`)){
        phoneBookService.updateData({...personObject, name: repeatPerson}, updateID).then(response => {
          setPersons(persons.map(value => value.id !== updateID ? value : {...response.data, name: repeatPerson}))
        })
        setNumberMessage(`${repeatPerson}'s number has been changed`)
        setTimeout(() => {
          setNumberMessage(null)
        }, 5000)
        setNewName('')
       setNewNumber('')
      }
    }   
  }

  // 根据用于搜索的文本来过滤哪些联系人可以被显示，哪些不能被显示
  const personToShow = (newSearch === "") 
                       ? persons 
                       : persons.filter(value => value.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <ShowMessage nameMessage={nameMessage} numberMessage={numberMessage}/>
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange} 
                  handlePersonChange={handlePersonChange}/>
      <h3>Numbers</h3>
      <Person personToShow={personToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App