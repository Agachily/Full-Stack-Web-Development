const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// 判断以JSON格式返回的blog文章数量是否正确
test('the return number of blogs should be right', async() => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(2)
    
})

afterAll(() => {
    mongoose.connection.close()
})