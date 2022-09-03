import { axios } from '../lib'
import { shuffle, sleep } from '../utils'

import { Post } from './posts.types'
import { User } from './users.types'

export async function getAll() {
  await sleep(1000)
  return axios.get<User[]>('/users').then(({ data }) => shuffle(data))
}

export async function getById(id: number) {
  return axios.get(`/users/${id}`).then(({ data }) => data)
}

export async function getPosts(id: number) {
  await sleep(1000)
  return axios
    .get<Post[]>(`/users/${id}/posts`)
    .then(({ data }) => shuffle(data))
}

const usersApi = {
  getAll,
  getById,
  getPosts
}

export default usersApi
