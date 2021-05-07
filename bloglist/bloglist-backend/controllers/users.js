const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')

router.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(result)
})

router.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password) return res.status(400).send({ error: 'missing username or password' })
  if (!(req.body.username.length >= 3 && req.body.password.length >= 3)) return res.status(400).send({ error: 'username or password too short' })
  const passwordHash = await bcrypt.hash(req.body.password, 11)
  const user = new User({
    username: req.body.username,
    passwordHash,
    name: req.body.name
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = router
