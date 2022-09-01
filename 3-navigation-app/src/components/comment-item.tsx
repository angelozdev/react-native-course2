import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface CommentItemProps {
  title: string
  comment: string
}

export default function CommentItem({ title }: CommentItemProps) {
  return (
    <View style={styles.container}>
      <Text>᭸ {title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 4
  }
})
