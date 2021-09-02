// 导入express
const { response } = require('express')
const express = require('express')
// 创建一个存储在app变量中的express应用
const app = express()
// 激活json-parser并实现一个处理http post请求的初始处理程序
app.use(express.json())

// 以下为服务器中存储的联系人数据
let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Marry Poppendieck", 
      "number": "39-23-6423122"
    }
]

// 响应浏览器请求，并返回电话簿数据
app.get('/api/persons', (repuest, response) => {
   response.json(notes)
})

// 返回电话簿中的整体数据
app.get('/info', (request,response) => {
  const sum = notes.length
  const date = new Date()
  response.send(`<div>Phonebook has info for ${sum} people</div>
                <div>${date}</div>`)
})

// 获取单个联系人的信息
app.get('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  const person = notes.find(note => note.id === id)
  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// 删除某个联系人的信息
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// 向服务端写入数据
app.post('/api/persons', (request, response) => {
  //为新添加的联系人创建ID
  const id = Math.floor((Math.random()*10000));
  const sendPerson = request.body
  let isUnique = true
  sendPerson.id = id
  // 判断电话簿中是否有该联系人
  notes.forEach(value => {
    if(value.name === sendPerson.name){isUnique = false}
  })

  if (!sendPerson.name){
    return response.status(400).json({error:'Name Missing'})
  } else if(!sendPerson.number){
    return response.status(400).json({error:'Number Missing'})
  } else if(!isUnique){
    return response.status(400).json({error:'name must be unique'})
  }else{
    notes = notes.concat(sendPerson)
    response.json(sendPerson) 
  }  
})

// 在3001端口对浏览器的请求进行监听
const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})