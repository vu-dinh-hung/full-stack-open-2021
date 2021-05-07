const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)
const baseUrl = '/api/users'

describe('POST users', () => {
  test('valid user POST request succeeds with status 201', async () => {
    const usersBefore = await usersInDb()
    // console.log('---------------------now adding user');
    const user = {
      username: 'vudinhhung',
      password: 'p4ssw0rd',
      name: 'Hung Vu'
    }
    const res = await api.post(baseUrl)
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length + 1)
  })

  test('user POST request with missing username or password fails with status 400', async () => {
    const usersBefore = await usersInDb()
    const user = {
      username: 'vu',
      password: 'p4ssw0rd',
      name: 'hung vu'
    }
    await api.post(baseUrl)
      .send(user)
      .expect(400)
    let usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)

    const user2 = {
      username: 'vudinhhung',
      password: 'p4',
      name: 'hung vu'
    }
    await api.post(baseUrl)
      .send(user2)
      .expect(400)
    usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
