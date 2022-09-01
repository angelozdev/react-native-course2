import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native'

import usersApi from '../api/users'
import { usePromise } from '../hooks'
import { PostItem } from '../components'

import { type PostsProps } from './types'

export default function PostsScreen({ route }: PostsProps) {
  const { id } = route.params
  const { data, isPending, isResolved } = usePromise(() =>
    usersApi.getPosts(id)
  )

  return (
    <View>
      {isPending && (
        <View style={styles.container}>
          <ActivityIndicator animating={isPending} />
        </View>
      )}

      {isResolved && (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          keyExtractor={({ id: postId }) => postId.toString()}
          renderItem={({ item: { body, title, id: postId } }) => (
            <PostItem id={postId} title={title} body={body} />
          )}
          data={data?.data}
          ListEmptyComponent={() => (
            <View style={styles.container}>
              <Text>No posts found</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  listContentContainer: {
    backgroundColor: '#f5f5f5'
  },
  container: {
    padding: 18
  }
})
