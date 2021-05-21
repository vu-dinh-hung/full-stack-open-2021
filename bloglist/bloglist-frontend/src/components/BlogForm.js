import React, { useState } from 'react'

const BlogForm = ({ handleSubmitBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await handleSubmitBlog({ newTitle, newAuthor, newUrl })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      title:<input id='blog_title_input' type='text' value={newTitle} onChange={event => setNewTitle(event.target.value)} />
      <br />
      author:<input id='blog_author_input' type='text' value={newAuthor} onChange={event => setNewAuthor(event.target.value)} />
      <br />
      url:<input id='blog_url_input' type='text' value={newUrl} onChange={event => setNewUrl(event.target.value)} />
      <br />
      <button id='blog_submit_button' type='submit'>create</button>
    </form>
  )
}

export default BlogForm
