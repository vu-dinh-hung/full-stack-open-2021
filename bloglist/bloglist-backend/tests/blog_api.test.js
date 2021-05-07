const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const { initialBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)

let userData = null

beforeEach(async () => {
  await User.deleteMany({})
  const testuser = {
    username: 'test',
    password: 'p4ssw0rd',
  }
  await api
    .post('/api/users')
    .send(testuser)

  const res = await api
    .post('/api/login')
    .send({ username: 'test', password: 'p4ssw0rd' })
  userData = res.body
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(initialBlogs.map(blog => new Blog(blog).save()))
})

describe('GET blogs', () => {
  test('retrieve blogs as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('retrieve correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs contain "id" property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('POST blog', () => {
  test('valid blog is successfully added', async () => {
    const blog = {
      title: 'post test',
      author: 'hung vu',
      url: 'none',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userData.token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(initialBlogs.length + 1)
    expect(blogsAfter.map(b => b.title)).toContain('post test')
  })

  test('blog with missing likes field defaults to 0 likes', async () => {
    const blog = {
      title: 'missing like',
      author: 'hung vu',
      url: ''
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userData.token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('trying to add blog without title and url yields 400 Bad Request', async () => {
    const blog = {
      author: 'hung vu',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userData.token}`)
      .send(blog)
      .expect(400)
  })

  test('trying to add blog without authorization token yields 401 Unauthorized', async () => {
    const blog = {
      title: 'no auth blog',
      author: 'hung vu',
      url: 'none',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })
})

describe('DELETE blog', () => {
  let blog = null
  beforeEach(async () => {
    const user = await User.findOne({ username: userData.username })
    const testblog = { title: "React patterns", author: "Michael Chan", user: user.id, url: "https://reactpatterns.com/", likes: 7, __v: 0 }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userData.token}`)
      .send(testblog)
    // console.log('beforeEachDelete', userData, response.body);
    blog = response.body
  })

  test('succeeds with valid id', async () => {
    const blogs = await blogsInDb()
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `bearer ${userData.token}`)
      .expect(204)
    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogs.length - 1)
  })
})

describe('PUT (update) blog', () => {
  test('succeeds with valid content', async () => {
    const update = {
      likes: 10000000,
      author: 'hacker'
    }

    const blogs = await blogsInDb()
    const id = blogs[0].id
    const response = await api
      .put(`/api/blogs/${id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect({ likes: response.body.likes, author: response.body.author }).toEqual(update)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})
