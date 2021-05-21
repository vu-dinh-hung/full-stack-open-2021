import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component, handleAddLike, handleDeleteBlog

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'hung',
      url: 'none',
      likes: 1,
      user: { username: 'hung' }
    }

    handleAddLike = jest.fn()
    handleDeleteBlog = jest.fn()
    component = render(
      <Blog blog={blog} user={{ username: 'hung' }} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
    )
  })

  test('renders title and author, but not url or likes by default', () => {
    expect(component.container.querySelector('.blog_title_author')).toBeDefined()
    expect(component.container.querySelector('.blog_details')).toBeNull()
  })

  test('renders blog details (url, likes, etc) when show details button is clicked', () => {
    fireEvent.click(component.container.querySelector('.show_blog_details_button'))
    expect(component.container.querySelector('.blog_details')).toBeDefined()
  })

  test('if the like button is clicked twice, handleAddlike is called twice', () => {
    fireEvent.click(component.container.querySelector('.show_blog_details_button'))
    fireEvent.click(component.container.querySelector('.add_like_button'))
    fireEvent.click(component.container.querySelector('.add_like_button'))
    expect(handleAddLike.mock.calls).toHaveLength(2)
  })
})
