const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}) 
  response.json(blogs) 
})
  
blogsRouter.post('/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    if(!blog.likes){
      blog.likes = 0
    }
    if(!blog.title && !blog.url){
      return response.status(400).json({error:'Title and Url Missing'})
    }
    const savedBlog = await blog.save()
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