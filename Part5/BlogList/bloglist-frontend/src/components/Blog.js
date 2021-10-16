import React, { useState } from 'react'

const Blog = ( { blog, handleLikeChange, logedUserName, handleDelete } ) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogDetailVisible, setBlogDetailVisible] = useState(false)
  const deleteBlog = () => {
    let storedUsername = ''
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      storedUsername = JSON.parse(loggedUserJSON).name
    }

    if(blog.author === logedUserName || blog.author === storedUsername){
      return(
        <div>
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </div>
      )
    }else{
      return
    }
  }

  if(!blogDetailVisible)
  {
    return(
      <div style={blogStyle} className='displayBlog'>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <button onClick={() => setBlogDetailVisible(true)}>view</button>
      </div>
    )
  }else{
    return(
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={() => setBlogDetailVisible(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={() => handleLikeChange(blog.id)}>like</button></div>
        <div>{blog.author}</div>
        {deleteBlog()}
      </div>
    )
  }
}

export default Blog