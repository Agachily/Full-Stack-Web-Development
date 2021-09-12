const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

// 判断以JSON格式返回的blog文章数量是否正确
test('the return number of blogs should be right', async() => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(4)
    
})

// 验证博客文章的唯一标识符属性是否命名为id
test('id is deifned as the identifier', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

// 验证是否能创建一个新的blog
test('The number of the blogs should increase by 1 after post a new one', async() => {
    //获取所有的用户
    const myLogin = {
        username: "test13",
        password: "123456",
    }
    const login = await api.post("/api/login").send(myLogin)
    // 获取初始博客的个数
    const initialLength = (await api.get('/api/blogs')).body.length
    const newBlog = {
        "title": "test 9",
        "author": "Author9",
        "url": "test url 9",
        "likes": 15
    } 
    await api.post('/api/blogs').set('Authorization',`bearer ${login.body.token}`).send(newBlog)
    const addedLength = await api.get('/api/blogs')
    expect(addedLength.body).toHaveLength(initialLength + 1)
})

// 如果请求中缺少like属性，它的默认值应为0
test('addition without likes, default should be 0', async()=>{
    let added = {}
    const newBlog = {
        title: "test 5",
        author: "Autohr4",
        url: "test url 4"
    }

    await api.post('/api/blogs').send(newBlog)

    const allBlogs = (await api.get('/api/blogs')).body
    console.log(allBlogs)
    allBlogs.forEach(value => {
        if (value.title === newBlog.title){
            added = value
        }
    })
    console.log(added)
    console.log(added.likes)
    expect(added.likes).toBe(0)
})

// 如果发送的令牌不存在，则返回状态码401
test('If the token does not exist, return 401', async() =>{
    const newBlog = {
        "title": "test 9",
        "author": "Author9",
        "url": "test url 9",
        "likes": 15
    } 
    await api.post('/api/blogs').set('Authorization','').send(newBlog).expect(401)
})

// 如果所发送的数据缺少title和author，则返回状态码404
test('If the title and author are misses, 404 should be returned', async() => {
    const badBlog = {
        "author": "Author7",
        "likes": 7
    }

    await api.post('/api/blogs').send(badBlog).expect(400)

})

// 如果所发送的数据被删除，所返回的额状态码应该是204
test('Respone code should be 204 after delete 1 after delete', async() => {
    const allBlogs = (await api.get('/api/blogs')).body
    await api.delete(`/api/blogs/${allBlogs[0].id}`).expect(204)
})

// 如果所发送的数据被更新。则返回状态码200
test('Response code should be 200 after update the blog', async() => {
    const allBlogs = (await api.get('/api/blogs')).body
    const newBlog = {
        "title": "test 7",
        "author": "Author7",
        "url": "test url 7",
        "likes": 7
    }
    await api.put(`/api/blogs/${allBlogs[0].id}`).send(newBlog).expect(200)
})


afterAll(() => {
    mongoose.connection.close()
})