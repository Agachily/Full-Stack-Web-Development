const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs.map(blog => blog.toJSON())) 
})
  
blogsRouter.post('/blogs', async (request, response) => {
    const body = request.body
    if(!body.title && !body.url){
      return response.status(400).json({error:'Title and Url Missing'})
    }
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/blogs/:id', async(request, response, next) =>{
   await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end()
})

blogsRouter.put('/blogs/:id', async(request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter