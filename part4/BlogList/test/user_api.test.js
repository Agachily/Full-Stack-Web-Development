const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// 如果用户名不唯一，则返回状态码400
test('Response code 400 is the username is not unique', async() => {
    const testUser = {
        "username": "test13",
        "name": "test12",
        "password": "asdasdwe"
    }

    const result = await api.post('/api/users').send(testUser).expect(400)
    expect(result.body.error).toContain('username must be unique')
})

// 用户名和密码至少是3个字符长
test('The length of both username and password must be at least 3', async() => {
    const testUser = {
        "username": "te",
        "name": "test12",
        "password": "as"
    }

    const result = await api.post('/api/users').send(testUser).expect(400)    
})

afterAll(done => {
    mongoose.connection.close()
    done()
})