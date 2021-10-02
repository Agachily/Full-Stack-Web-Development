import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Create from './components/Create'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [logedUser, setLogedUser] = useState([])
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  /* when click "create new blog", the form for creating new blog is shown, when
   click "cancle" is disappears. */
  const createBlog = () =>{
    const hideWhenVisible = {display: createVisible ? 'none' : ''}
    const showWhenVisible = {display: createVisible ? '' : 'none'}

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={()=>setCreateVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <Create blogs={blogs} setBlogs={setBlogs}/>
          <button onClick={()=>setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  console.log(logedUser)
  return (
    <div>
      <h2>login to application</h2>
      <Login setLogedUser={setLogedUser}/>
      <Logout blogs={blogs} setBlogs={setBlogs}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {createBlog()}
    </div>
  )
}

export default App