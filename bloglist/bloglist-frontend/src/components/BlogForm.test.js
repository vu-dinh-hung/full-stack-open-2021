import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls handleSubmitBlog with the right details when submit button is pressed', () => {
    const handleSubmitBlog = jest.fn()
    const component = render(
      <BlogForm handleSubmitBlog={handleSubmitBlog} />
    )
    const titleInput = component.container.querySelector('#blog_title_input')
    const authorInput = component.container.querySelector('#blog_author_input')
    const urlInput = component.container.querySelector('#blog_url_input')
    const submitButton = component.container.querySelector('#blog_submit_button')

    fireEvent.change(titleInput, { target: { value: 'test blog' } })
    fireEvent.change(authorInput, { target: { value: 'hung' } })
    fireEvent.change(urlInput, { target: { value: 'none' } })
    fireEvent.click(submitButton)
    waitFor(() => {
      expect(handleSubmitBlog.mock.calls[0][0]).toEqual({ newTitle: 'test blog', newAuthor: 'hung', newUrl: 'none' })
    })
  })
})
