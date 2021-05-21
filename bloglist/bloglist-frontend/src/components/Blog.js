import React, { useState } from 'react'

const Blog = ({ blog, user, handleAddLike, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='blog' style={{ border: 'solid', padding: 5 }}>
      <div className='blog_title_author'>
        {blog.title} {blog.author} <button className='show_blog_details_button' onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible &&
      <div className='blog_details'>
        <div>
          {blog.url}
        </div>
        <div className='blog_likes'>
          {blog.likes} <button className='add_like_button' onClick={() => handleAddLike(blog.id)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user.username === blog.user.username &&
          <button className='remove_blog_button' onClick={() => handleDeleteBlog(blog)}>remove</button>}
        </div>
      </div>
      }
    </div>
  )
}

export default Blog
