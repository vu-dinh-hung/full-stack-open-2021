const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String,
  likes: Number
})

blogSchema.path('url').required(function() { return this.title === undefined }, 'Path `url` is required if title is missing')

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
