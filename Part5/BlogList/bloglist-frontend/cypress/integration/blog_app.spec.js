describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'Test-1',
          username: 'Test-1',
          password: '8730201',
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    // 测试登录表单是否正确显示
    it('Login form is shown', function() {
      cy.contains('login to application')
    })

    // 测试成功和失败的登录尝试
    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#loginUsername').type('Test-1')
            cy.get('#loginPassword').type('8730201')
            cy.get('#loginButton').click()

            cy.contains('Test-1 logged in')
        })
      
        it('failed with wrong credentials', function() {
            cy.get('#loginUsername').type('Test-1')
            cy.get('#loginPassword').type('873201')
            cy.get('#loginButton').click()

            cy.contains('NB! Wrong credentials')
        })
    })

    // 检查用户在登录以后所能执行的操作
    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#loginUsername').type('Test-1')
            cy.get('#loginPassword').type('8730201')
            cy.get('#loginButton').click()
        })
    
        it('A blog can be created', function() {
            cy.get('#creatNewBlogButton').click()
            cy.get('#title').type('Test-5-19')
            cy.get('#author').type('Test-1')
            cy.get('#url').type('http://localhost:3000/')
            cy.get('#creatButton').click()
  
            cy.contains('Test-5-19')
        })

        it('if the like button works', function() {
            cy.get('#creatNewBlogButton').click()
            cy.get('#title').type('Test-5-19')
            cy.get('#author').type('Test-1')
            cy.get('#url').type('http://localhost:3000/')
            cy.get('#creatButton').click()

            cy.get('#viewButton').click()
            cy.get('#likeButton').click()
            cy.get('#likeButton').click()
            
            cy.contains('2')
        })

        it('if the delete button works', function() {
            cy.get('#creatNewBlogButton').click()
            cy.get('#title').type('Test-5-19')
            cy.get('#author').type('Test-1')
            cy.get('#url').type('http://localhost:3000/')
            cy.get('#creatButton').click()
            cy.get('#viewButton').click()
            cy.contains('remove')
        })
    })
})