const router = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = new Blog({ ...req.body, likes: req.body.likes || 0, user: req.user.id })

  const result = await blog.save()
  res.status(201).json(result)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() === req.user.id.toString()) {
    await blog.remove()
    res.status(204).end()
  } else {
    res.status(401).send({ error: 'unauthorized' })
  }
})

router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, author, url, likes }, { new: true })
  res.json(updatedBlog)
})

module.exports = router
