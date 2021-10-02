import React, { useState } from 'react'

const Logout = () => {
  const [logoutinfo] = useState('')

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.replace('http://localhost:3000/')
  }

  return(
    <div>
      <div>{ logoutinfo }</div>
      <button onClick={ handleLogout }>logout</button>
    </div>
  )
}

export default Logout