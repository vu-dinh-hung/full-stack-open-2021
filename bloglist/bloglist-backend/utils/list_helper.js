const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blog = blogs.find(b => b.likes === Math.max(...blogs.map(b => b.likes)))
  return (blog === undefined || blog === -1) ? {} : { title: blog.title, author: blog.author, likes: blog.likes }
}

const groupby = (array, key) => {
  return array.reduce((map, item) => map.set(key(item), [...(map.get(key(item)) || []), item]), new Map())
}

const mostBlogs = (blogs) => {
  const counter = groupby(blogs, (blog) => blog.author)
  const pairs = [...counter.entries()]
  const maxpair = pairs.length === 0 ? undefined : pairs.reduce((m, e) => e[1].length > m[1].length ? e : m)
  return maxpair === undefined ? {} : { author: maxpair[0], blogs: maxpair[1].length }
}

const mostLikes = (blogs) => {
  const counter = groupby(blogs, (blog) => blog.author)
  const sumLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)
  const pairs = [...counter.entries()]
  const maxpair = pairs.length === 0 ? undefined : pairs.reduce((m, e) => sumLikes(e[1]) > sumLikes(m[1]) ? e : m)
  return maxpair === undefined ? {} : { author: maxpair[0], likes: sumLikes(maxpair[1]) }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
