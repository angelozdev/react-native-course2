import Axios from 'axios'
import { User } from './users-types'

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}

export async function getAll() {
  await sleep(1000)
  return axios.get<User[]>('/users')
}

export function getById(id: number) {
  return axios.get(`/users/${id}`)
}

const usersApi = {
  getAll,
  getById
}

export default usersApi
