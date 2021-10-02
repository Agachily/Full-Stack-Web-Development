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
  const showCreateBlogForm = () =>{
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

  /* update the information of blogs when "likes" change */
  const handleLikeChange = (blogId) => {
    const targetBlog = blogs.find(blog => blog.id === blogId)
    const newTargetBlog = {...targetBlog, likes: targetBlog.likes+1}
    blogService.update(blogId, newTargetBlog)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : newTargetBlog))
  }

  /* Delete blog by its id */
  const handleDelete = (blogId) =>{
    const blog = blogs.find(blog => blog.id === blogId)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogService.deleteBlog(blogId)
                 .then(setBlogs(blogs.filter(item => item.id !== blogId)), alert("Delete Succeed"))
    }
  }

  console.log(logedUser.name)
  return (
    <div>
      <h2>login to application</h2>
      <Login setLogedUser={setLogedUser}/>
      <Logout blogs={blogs} setBlogs={setBlogs}/>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeChange={handleLikeChange} 
              logedUserName={logedUser.name} handleDelete={handleDelete}/>
      )}
      {showCreateBlogForm()}
    </div>
  )
}

export default App