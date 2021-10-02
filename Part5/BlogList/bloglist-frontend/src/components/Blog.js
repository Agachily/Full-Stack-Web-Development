import React, { useState, useEffect } from 'react'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogDetailVisible, setBlogDetailVisible] = useState(false)
  
  if(!blogDetailVisible)
  {
    return(
      <div style={blogStyle}>
        {blog.title}
        <button onClick={()=>setBlogDetailVisible(true)}>view</button>
      </div> 
    )
  }else{
    return(
    <div style={blogStyle}>
      <div>{blog.title}<button onClick={()=>setBlogDetailVisible(false)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes 0<button>like</button></div>
      <div>{blog.author}</div>
    </div> 
    )
  }
}

export default Blog