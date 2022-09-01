import React from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'
import postsApi from '../api/posts'
import { usePromise, useToggle } from '../hooks'
import CommentItem from './comment-item'

interface PostItemProps {
  title: string
  body: string
  id: number
}
function PostItem({ body, title, id }: PostItemProps) {
  const [isCommentsVisibles, loadComments] = useToggle(false)
  const { data, isIdle, isPending, isResolved } = usePromise(
    () => postsApi.getComments(id),
    { enabled: isCommentsVisibles }
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {isIdle && <Button onPress={loadComments} title="Show comments" />}
      {isPending && <ActivityIndicator />}
      {isResolved && (
        <FlatList
          renderItem={({ item: { name, body: comment } }) => (
            <CommentItem title={name} comment={comment} />
          )}
          data={data?.data}
          keyExtractor={({ id: commentId }) => commentId.toString()}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  body: {
    marginBottom: 16
  }
})

export default PostItem
