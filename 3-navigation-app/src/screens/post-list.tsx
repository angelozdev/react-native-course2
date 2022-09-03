import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { usePromise } from '../hooks'
import postsApi from '../api/posts'
import { PostItem } from '../components'

export default function PostList() {
  const { data, isPending, refetch } = usePromise(postsApi.getAll, {
    keepPreviousData: true
  })

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={refetch} />
      }
      keyExtractor={({ id: postId }) => postId.toString()}
      data={data}
      renderItem={({ item: post }) => (
        <PostItem id={post.id} body={post.body} title={post.title} />
      )}
    />
  )
}
