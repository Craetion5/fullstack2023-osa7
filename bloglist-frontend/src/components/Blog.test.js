import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {

    const user = {
        name: 'test',
        username: 'test user',
        id: '321'
    }

    const blog = {
        title: 'testblog',
        author: 'me',
        url: 'no url haha',
        likes: 1,
        user: user
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleUpdateBlog={mockHandler} handleDeleteBlog={mockHandler} user={user} />)

    const element = screen.getByText('testblog', { exact: false })
    expect(element).toBeDefined()
})

test('clicking the button opens more stuff', async () => {
    const blogUser = {
        name: 'test',
        username: 'test user',
        id: '321'
    }

    const blog = {
        title: 'testblog',
        author: 'me',
        url: 'no url haha',
        likes: 12345,
        user: blogUser
    }

    const mockHandler = jest.fn()

    const user = userEvent.setup()

    render(<Blog blog={blog} handleUpdateBlog={mockHandler} handleDeleteBlog={mockHandler} user={blogUser} />)

    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('me', { exact: false })
    expect(element).toBeDefined()
    const element2 = screen.getByText('no url haha', { exact: false })
    expect(element2).toBeDefined()
    const element3 = screen.getByText('12345', { exact: false })
    expect(element3).toBeDefined()
    const element4 = screen.getByText('test user', { exact: false })
    expect(element4).toBeDefined()
})

test('blog liking handler is called', async () => {
    const blogUser = {
        name: 'test',
        username: 'test user',
        id: '321'
    }

    const blog = {
        title: 'testblog',
        author: 'me',
        url: 'no url haha',
        likes: 12345,
        user: blogUser
    }

    const mockHandler = jest.fn()

    const user = userEvent.setup()

    render(<Blog blog={blog} handleUpdateBlog={mockHandler} handleDeleteBlog={mockHandler} user={blogUser} />)

    const button = screen.getByText('view')
    await user.click(button)

    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)
})