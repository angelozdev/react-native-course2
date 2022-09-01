import { Text, StyleSheet, Pressable } from 'react-native'
import { darken } from 'polished'
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
      style={({ pressed }) => [styles.container, pressed && styles.isPressed]}
    >
      <Text>{username}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  isPressed: {
    backgroundColor: darken(0.05, '#fff')
  }
})
