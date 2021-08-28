import axios from 'axios'
import React, { useEffect, useState } from 'react'

// 对检索到的数据进行展示
const ShowCountries = ({shownCountries}) =>{
  // 注意在以下的判断语句中，要将所有的情况都进行处理
  if (shownCountries.length > 10){
    return(<div>Too many matches, specify another filter</div>)
  }else if( shownCountries.length <= 10 && shownCountries.length > 1){
    return (
    <div>
      {shownCountries.map(value => 
        <div key={value.name}>{value.name}</div>
      )}
    </div>)
  }else if(shownCountries.length === 1){
    return(
      <div>
      <h2>{shownCountries[0].name}</h2>
      <div>captical {shownCountries[0].captital}</div>
      <div>population {shownCountries[0].population}</div>
      <h3>languages</h3>
      <div><ul>{shownCountries[0].languages.map(value => <li key={value.name}>{value.name}</li>)}</ul></div>
      <img src={shownCountries[0].flag} style={{width: 200}}/>
      </div> 
    )
  }else{
    return(<div></div>)
  }
}

const App = () => {
  //定义状态。countries用于存储所有搜索到的国家，search用于存储搜索国家的文本
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  //用于从数据库中获取数据
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  },[])

  //当用于搜索的文本发生变化时，对该文本进行更新
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  // 根据搜索文本对数据库中的国家进行过滤
  const shownCountries = (search === "")
                       ? countries
                       : countries.filter(value => value.name.toLowerCase().includes(search.toLowerCase()))
  console.log(shownCountries.length)
  return(
    <div>
    <div>find countries <input value={search} onChange={handleSearch}/></div>
    <div><ShowCountries shownCountries={shownCountries}/></div>
    </div>
  )
}

export default App
