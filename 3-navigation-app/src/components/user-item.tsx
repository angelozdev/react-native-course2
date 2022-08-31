import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

interface UserItemProps {
  onClick?: () => void
  username: string
}

export default function UserItem({ onClick, username }: UserItemProps) {
  return (
    <Pressable
      onPress={onClick}
      accessibilityRole="button"
      style={styles.container}
    >
      <Text>{username}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})
