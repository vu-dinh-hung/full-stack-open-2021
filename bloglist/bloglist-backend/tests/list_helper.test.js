const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const { oneBlogList, initialBlogs } = require('./test_helper')

test('dummy returns 1', () => {
  expect(dummy([])).toBe(1)
})

describe('totalLikes', () => {
  test('of empty blog list', () => {
    expect(totalLikes([])).toBe(0)
  })
  test('of 1 blog', () => {
    expect(totalLikes(oneBlogList)).toBe(5)
  })
  test('of many blogs', () => {
    expect(totalLikes(initialBlogs)).toBe(38)
  })
})

describe('favoriteBlog', () => {
  test('of empty blog list', () => {
    expect(favoriteBlog([])).toEqual({})
  })
  test('of 1 blog', () => {
    expect(favoriteBlog(oneBlogList)).toEqual({ title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('of many blogs', () => {
    expect(favoriteBlog(initialBlogs)).toEqual(
      expect.objectContaining({ likes: 12 })
    )
  })
})

describe('mostBlogs', () => {
  test('of empty blog list', () => {
    expect(mostBlogs([])).toEqual({})
  })
  test('of 1 blog', () => {
    expect(mostBlogs(oneBlogList)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('of many blogs', () => {
    expect(mostBlogs(initialBlogs)).toEqual(
      expect.objectContaining({ blogs: 3 })
    )
  })
})

describe('mostLikes', () => {
  test('of empty blog list', () => {
    expect(mostLikes([])).toEqual({})
  })
  test('of 1 blog', () => {
    expect(mostLikes(oneBlogList)).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('of many blogs', () => {
    expect(mostLikes(initialBlogs)).toEqual(
      expect.objectContaining({ likes: 17 })
    )
  })
})
