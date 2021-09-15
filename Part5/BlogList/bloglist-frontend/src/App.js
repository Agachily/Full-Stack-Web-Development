import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [logedUser, setLogedUser] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log(logedUser)
  return (
    <div>
      <h2>login to application</h2>
      <Login setLogedUser={setLogedUser}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Create blogs={blogs} setBlogs={setBlogs}/>
    </div>
  )
}

export default App