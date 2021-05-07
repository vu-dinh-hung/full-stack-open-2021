const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) return res.status(401).send({ error: 'user does not exist' })
  const passwordCorrect = await bcrypt.compare(req.body.password, user.passwordHash)
  if (!passwordCorrect) return res.status(401).send({ error: 'wrong password' })

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, config.SECRET)
  res.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = router
