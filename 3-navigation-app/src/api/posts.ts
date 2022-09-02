import Axios from 'axios'
import { sleep } from '../utils'
import { Comment } from './comments.types'

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getComments(postId: number) {
  console.log('getComments', postId)
  await sleep(1000)

  return axios.get<Comment[]>(`/${postId}/comments`).then((res) => res.data)
}

const postsApi = {
  getComments
}

export default postsApi
