import React, { useState, useEffect, useRef } from 'react'
import NotificationBanner from './components/NotificationBanner'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const toggleableBlogFormRef = useRef()

  useEffect(() => {
    const userStr = window.localStorage.getItem('blogAppUser')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes))
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ type: 'error', message: 'invalid credentials' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const handleSubmitBlog = async (blog) => {
    const returnedBlog = await blogService.post({ title: blog.newTitle, author: blog.newAuthor, url: blog.newUrl })
    toggleableBlogFormRef.current.setVisible(false)
    setNotification({ message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))
  }

  const handleDeleteBlog = async (blog) => {
    const confirmed = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (confirmed) {
      await blogService.deleteById(blog.id)
      setBlogs(blogs.filter(b => !(b.id === blog.id)))
    }
  }

  const handleAddLike = async (blogId) => {
    const blog = blogs.filter(b => b.id === blogId)[0]
    blog.likes += 1
    const returnedBlog = await blogService.put(blogId, blog)
    setBlogs(blogs.map(b => b.id === blogId ? returnedBlog : b).sort((b1, b2) => b2.likes - b1.likes))
  }

  if (user === null) {
    return (
      <div id='login_div'>
        <h2>Log in to application</h2>
        {notification && <NotificationBanner notification={notification} />}
        <form id='login_form' onSubmit={handleLogin}>
          username <input id='username_input' type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
          <br />
          password <input id='password_input' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
          <br />
          <button id='login_button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <NotificationBanner notification={notification} />}
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <br />
      <div>
        <Toggleable showLabel='add blog' hideLabel='cancel' ref={toggleableBlogFormRef}>
          <BlogForm
            handleSubmitBlog={handleSubmitBlog}
          />
        </Toggleable>
      </div>
      <div id='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App
