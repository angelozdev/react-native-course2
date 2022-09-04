import React from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import postsApi from '../api/posts'
import { usePromise, useToggle } from '../hooks'
import CommentItem from './comment-item'

interface PostItemProps {
  title: string
  body: string
  id: number
}
function PostItem({ body, title, id }: PostItemProps) {
  const toast = useToast()
  const [isCommentsVisibles, loadComments] = useToggle(false)
  const { data, isPending, isResolved } = usePromise(
    () => postsApi.getComments(id, { limit: 5 }),
    {
      enabled: isCommentsVisibles,
      onError(error) {
        loadComments()
        toast.show(error.message)
      }
    }
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {!isPending && (
        <Button
          onPress={loadComments}
          title={isCommentsVisibles ? 'Hide' : 'Show last 5 comments'}
        />
      )}
      {isPending && <ActivityIndicator />}
      {isResolved && isCommentsVisibles && (
        <FlatList
          renderItem={({ item: { name, body: comment, email } }) => (
            <CommentItem email={email} title={name} comment={comment} />
          )}
          data={data}
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
    marginHorizontal: 12,
    backgroundColor: '#fff',
    flexGrow: 1,
    marginTop: 18
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

export default React.memo(PostItem)
