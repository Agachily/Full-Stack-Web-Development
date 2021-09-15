import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// 构造Token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create run')
  return response.data
}

export default { getAll, create, setToken }