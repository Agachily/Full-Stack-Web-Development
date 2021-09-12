const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    let isUnique = false
    const body = request.body

  const saltRounds = 10
  if((body.password.length < 3) || (body.username.length < 3) ){
    return response.status(400).json({error:'The length of password and username should at least be 3'})
  }

  if(!body.username || !body.password){
      return response.status(400).json({error:'username and password should be both submitted'})
  }

  const cunrrentUser = await User.find({})
  cunrrentUser.forEach(value => {
      if(value.username == body.username){
        isUnique = true
      }
  })
  if(isUnique){
    return response.status(400).json({error:'username must be unique'})
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter