import { axios } from '../lib'
import { shuffle, sleep } from '../utils'
import { Comment } from './comments.types'
import { Post } from './posts.types'
import { IOptions } from './common.types'

export async function getComments(postId: number, options: IOptions = {}) {
  const { limit, offset } = options
  return axios
    .get<Comment[]>(`/posts/${postId}/comments`, {
      params: { _limit: limit, _offset: offset }
    })
    .then((data) => {
      if (Math.random() > 0.6)
        throw new Error('Something went wrong when fetching comments')
      return data
    })
    .then((res) => shuffle(res.data))
}

export async function getAll() {
  await sleep(1000)
  return axios.get<Post[]>(`/posts`).then((res) => shuffle(res.data))
}

const postsApi = {
  getComments,
  getAll
}

export default postsApi
