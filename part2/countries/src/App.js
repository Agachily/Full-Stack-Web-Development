import axios from 'axios'
import React, { useEffect, useState } from 'react'
const weather_api_key = process.env.REACT_APP_API_KEY

//对所选定国家的首都的天气进行展示
const DisplayWeather = ({capital}) => {
  // whether用于存储所获取到的天气
  const [weather, setWeather] = useState([])

  //从天气数据库中获取天气数据
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${capital}`).then(response => {
      setWeather([response.data.current.temperature, response.data.current.weather_icons, 
        response.data.current.wind_speed, response.data.current.wind_dir])
      })
  }, [capital])
   return(
     <div>
       <div><b>temperature: </b>{weather[0]}</div>
       <div><img src={weather[1]} style={{width: 150}}/></div>
       <div><b>wind: </b>{weather[2]} mph direction {weather[3]}</div>
     </div>
   )
}

// 对单个国家进行展示
const DisplaySingleCountry = ({singleCountry}) =>{
  return(
    <div>
      <h2>{singleCountry.name}</h2>
      <div>capital {singleCountry.capital}</div>
      <div>population {singleCountry.population}</div>
      <h3>languages</h3>
      <div><ul>{singleCountry.languages.map(value => <li key={value.name}>{value.name}</li>)}</ul></div>
      <img src={singleCountry.flag} style={{width: 200}}/>
      <h3>Weather in {singleCountry.capital}</h3>
      <DisplayWeather capital={singleCountry.capital}/>
    </div>
  )
}

// 当检索到的国家数量在1～10之间时对其进行显示
const DisplayBatchCountries = ({country}) => {
  const [selectCountries, setSelectCountries] = useState(false)
  const handleSelectCountries = () => {setSelectCountries(true)}
  
  // 如果selectCountries为true，则显示国家的具体信息
  if(selectCountries){
    return(<div><DisplaySingleCountry singleCountry={country}/></div>)
  }else{
    return(<div>{country.name} <button onClick={handleSelectCountries}>show</button></div>)
  }
}

// 对检索到的数据进行展示
const ShowCountries = ({shownCountries}) =>{
  // 注意在以下的判断语句中，要将所有的情况都进行处理
  if (shownCountries.length > 10){
    return(<div>Too many matches, specify another filter</div>)
  }else if( shownCountries.length <= 10 && shownCountries.length > 1){
    return (
    <div>
      {shownCountries.map(value => 
        <DisplayBatchCountries key={value.name} country={value}/>)}
    </div>)
  }else if(shownCountries.length === 1){
    return(
      <DisplaySingleCountry singleCountry={shownCountries[0]}/>
    )
  }else{
    return(<div></div>)
  }
}

const App = () => {
  //定义状态。countries用于存储所有搜索到的国家，search用于存储搜索国家的文本
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [filterCountries, setFilterCountries] = useState([])
  
  //用于从数据库中获取国家数据
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  },[])

  //当用于搜索的文本发生变化时，对该文本进行更新，并对数据库中的国家进行过滤
  const handleSearch = (event) => {
    let temp = event.target.value
    setSearch(event.target.value)
    setFilterCountries(countries.filter(value => value.name.toLowerCase().includes(temp.toLowerCase())))
  }
  return(
    <div>
    <div>find countries <input value={search} onChange={handleSearch}/></div>
    <div><ShowCountries shownCountries={filterCountries}/></div>
    </div>
  )
}

export default App
