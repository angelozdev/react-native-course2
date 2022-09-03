import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { darken } from 'polished'

interface CommentItemProps {
  title: string
  comment: string
  email: string
}

export default function CommentItem({
  title,
  email,
  comment
}: CommentItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={2}>{comment}</Text>
      <Text style={styles.email}>By: {email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: darken(0.02, '#fff')
  },
  email: {
    fontSize: 12,
    color: '#999',
    marginTop: 8
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 8
  }
})
