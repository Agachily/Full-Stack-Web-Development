const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs.map(blog => blog.toJSON())) 
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // 找出是谁发送的删除请求
  const user = await User.findById(decodedToken.id)
  // 找出所要删除的博客
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    response.status(403).json({ error: 'The user does not have any blog now' })
  }
  // 一个博客只有其所有者才能删除，空博客则可以被任何人删除
  if (!blog.user) {
    blog.remove()
    response.status(204).end()
  } else if (blog.user.toString() === user.id.toString()) {
    blog.remove()
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'only the blog owner can delete the blog' })
  }
})

blogsRouter.post('/blogs', async (request, response) => {
    const body = request.body
    if(!body.title && !body.url){
      return response.status(400).json({error:'Title and Url Missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
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