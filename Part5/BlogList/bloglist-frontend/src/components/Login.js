import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ setLogedUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  // 检查在本地存储中是否能找到用户的登陆信息
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user.name+'kkk')
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setLogedUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('NB! Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user.name){
    return(<div>{user.name} logged in</div>)
  }
  else{
    return(
      <div>
        <div><h2>{errorMessage}</h2></div>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              id='loginUsername'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
        password:
            <input
              type="password"
              id='loginPassword'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="loginButton">login</button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  setLogedUser: PropTypes.func.isRequired
}

export default Login