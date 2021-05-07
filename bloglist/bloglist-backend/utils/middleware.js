const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  req.token = null
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) req.token = auth.substring(7)
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.decode(req.token, config.SECRET)
  if (!decodedToken) return res.status(401).json({ error: 'invalid token' })
  req.user = await User.findById(decodedToken.id)
  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
