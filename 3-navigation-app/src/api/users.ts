import Axios from 'axios'
import { shuffle, sleep } from '../utils'
import { Post } from './posts.types'
import { User } from './users.types'

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getAll() {
  await sleep(1000)
  return axios.get<User[]>('/').then(({ data }) => shuffle(data))
}

export async function getById(id: number) {
  return axios.get(`/${id}`).then(({ data }) => data)
}

export async function getPosts(id: number) {
  await sleep(1000)
  return axios.get<Post[]>(`/${id}/posts`).then(({ data }) => shuffle(data))
}

const usersApi = {
  getAll,
  getById,
  getPosts
}

export default usersApi
