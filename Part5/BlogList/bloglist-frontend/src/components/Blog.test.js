/* 本文件用于对前端应用进行测试 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Create from './Create'

describe('<Blog />', () => {
    let component
    
    let mockHandlerForLikeButton = jest.fn()

    beforeEach(() => {
        // 初始化用于构造blog的基本信息
        const blog = {
            author: 'AuthorTest5-13', 
            title: 'TitleTest5-13',
            likes: '2',
            url: 'http://localhost:7777',
            user:{
                username: 'Test14',
                name: 'Test14',
            }
        }

        // 对该blog组件进行渲染
        component = render(
            <Blog blog={blog} handleLikeChange={mockHandlerForLikeButton}/>
        )
    })

    // Tese 1
    test('Blogs render the author and title', () => {
        expect(component.container).toHaveTextContent('AuthorTest5-13')
        expect(component.container).toHaveTextContent('TitleTest5-13')
    })

    // Test 2
    test('Clicking the view button, the detailed information will be diaplayed', () => {
        // 根据组件渲染的文本找到按钮，然后单击该按钮
        const button = component.getByText('view')
        fireEvent.click(button)
        // 测试单击按钮后，所期望的信息是否出现
        expect(component.container).toHaveTextContent('2')
        expect(component.container).toHaveTextContent('http://localhost:7777')
    })

    // Test 3
    test('Clicking the like button twice and corresponding function should be called twice', () => {
        // 根据组件渲染的文本找到view按钮，然后单击该按钮
        const buttonForView = component.getByText('view')
        fireEvent.click(buttonForView)
        // 根据组件渲染的文本找到like按钮，然后单击该按钮两次
        const buttonForLike = component.getByText('like')
        fireEvent.click(buttonForLike)
        fireEvent.click(buttonForLike)
        // 验证mock function 是否被调用了两次
        expect(mockHandlerForLikeButton.mock.calls).toHaveLength(2)
    })
})

