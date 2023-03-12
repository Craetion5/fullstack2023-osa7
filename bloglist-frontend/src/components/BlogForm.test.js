import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form data is properly forwarded', async () => {

    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<BlogForm handleNewBlog={mockHandler} />)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'field1title')
    await user.type(inputs[1], 'field2author')
    await user.type(inputs[2], 'field3url')

    const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('field1title')
    expect(mockHandler.mock.calls[0][0].author).toBe('field2author')
    expect(mockHandler.mock.calls[0][0].url).toBe('field3url')
})