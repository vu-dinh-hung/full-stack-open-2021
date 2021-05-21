import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = async (blog) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } })
  return response.data
}

const put = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return response.data
}

export default { setToken, getAll, post, put, deleteById }
