const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

const oneBlogList = [
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5, __v: 0 }
]
const initialBlogs = [
  { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/",
    likes: 7, __v: 0 },
  { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5, __v: 0 },
  { title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12, __v: 0 },
  { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 12, __v: 0 },
  { title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0, __v: 0 },
  { title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2, __v: 0 }
]

const initialUsers = [
  // {username: 'test', password: 'p4ssw0rd'}
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  console.log(users);
  return users.map(u => u.toJSON())
}

module.exports = { oneBlogList, initialBlogs, initialUsers, blogsInDb, usersInDb }
