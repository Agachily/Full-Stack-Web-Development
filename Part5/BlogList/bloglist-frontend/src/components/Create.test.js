/* 本文件用于对前端应用进行测试 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './Create'

describe('<Create />', () => {
    test('Approciate action of create component', () => {
        const blogs = []
        let mockHandlerForCreateButton = jest.fn()
        const component = render(
            <Create blogs={blogs} setBlogs={mockHandlerForCreateButton}/>
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'TestTitle16' }
        })
        fireEvent.change(author, {
            target: { value: 'TestAuthor16' }
        })
        fireEvent.change(url, {
            target: { value: 'http://localhost:8888' }
        })
        fireEvent.submit(form)

        expect(mockHandlerForCreateButton.mock.calls).toHaveLength(1)
    })
})