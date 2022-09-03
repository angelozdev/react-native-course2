import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-type': 'application/json'
  }
})

export default axios
