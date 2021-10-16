import React, { useState } from 'react'
import blogService from '../services/blogs'

const Create = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleCreate = async (event) => {
    setBlogs(blogs)
    event.preventDefault()
    try {
      blogService.create({ title, author, url }).then(returnedBlog => {
        let Blogs = blogs.concat(returnedBlog)
        setBlogs(Blogs)
        setSuccessMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    } catch (exception) {
      setErrorMessage('Add blogs not succeed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <div>
      <div><h2>{successMessage}</h2></div>
      <div><h2>{errorMessage}</h2></div>
      <form onSubmit={handleCreate}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="title"
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="author"
            value={author}
            name="author"
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            type="url"
            value={url}
            name="url"
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Create